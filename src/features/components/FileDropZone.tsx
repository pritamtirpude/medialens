import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatFileSize, getErrorMessage } from "@/lib/utils";
import { useTrackStore } from "@/store/tracksStore";
import { Upload } from "lucide-react";
import { ALL_FORMATS, BlobSource, CanvasSink, Input } from "mediabunny";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function FileDropZone() {
  const { setInputTracks, inputTracks, setIsTrackLoading, isTrackLoading } = useTrackStore();
  const [thumbnail, setThumbnail] = useState<HTMLCanvasElement | OffscreenCanvas | null>(null);

  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    isFocused,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"],
    },
    maxFiles: 1,
    async onDrop(acceptedFiles) {
      if (acceptedFiles.length === 0) return;

      setIsTrackLoading?.(true);
      setThumbnail(null);

      const file = acceptedFiles[0];

      setTimeout(() => {
        const input = new Input({
          formats: ALL_FORMATS,
          source: new BlobSource(file),
        });

        setInputTracks(input);
      }, 800);
    }
  });

  useEffect(() => {
    const getThumbnail = async () => {
      if (!inputTracks) return;

      const videoTrack = await inputTracks.getPrimaryVideoTrack();
      if (!videoTrack) return;

      const sink = new CanvasSink(videoTrack, {
        width: 320,
        height: 180,
        fit: "cover",
      });

      const start = await videoTrack.getFirstTimestamp();
      const duration = await videoTrack.computeDuration();

      // take thumbnail at 20% of video
      const timestamp = start + 0.2 * duration;

      for await (const result of sink.canvasesAtTimestamps([timestamp])) {
        if (result?.canvas) {
          setThumbnail(result.canvas);
          break; // only one thumbnail
        }
      }

    };
    setIsTrackLoading?.(false);

    getThumbnail();
  }, [inputTracks, setIsTrackLoading]);


  const errorMessage =
    fileRejections.length > 0 ? getErrorMessage(fileRejections) : null;

  const mediaFileInfo = acceptedFiles.length > 0 ? acceptedFiles[0] : null;
  const isVideoFile = mediaFileInfo?.type?.startsWith('video/') || false;


  return (
    <section className="">
      <div
        {...getRootProps({
          onClick: () => {
            setThumbnail(null);
          },
          className: cn(
            "min-h-64 flex justify-center flex-col items-center border-4 cursor-pointer border-primary border-dashed p-4 rounded-md transition duration-150",
            isDragActive || isFocused ? "border-primary" : "",
            fileRejections?.length > 0 ? "border-red-400" : ""
          ),
        })}
      >
        <input {...getInputProps()} />

        {acceptedFiles.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-2">
            <Upload className="text-primary" size={50} />
            <p className="text-secondary-foreground">Drag & drop a file here</p>
          </div>
        )}

        {errorMessage && <p className="text-red-400">{errorMessage.message}</p>}
        {isTrackLoading && isVideoFile ? <div>
          <Skeleton className="w-xs h-[180px] bg-secondary dark:bg-primary-foreground" />
        </div> : thumbnail && (
          <div className="mb-3 flex justify-center">
            <div
              className="rounded-md overflow-hidden border"
              ref={(el) => {
                if (el && thumbnail && !el.hasChildNodes()) {
                  if (thumbnail instanceof HTMLCanvasElement) {
                    el.appendChild(thumbnail);
                  } else if (thumbnail instanceof OffscreenCanvas) {
                    thumbnail.convertToBlob().then((blob) => {
                      const img = document.createElement('img');
                      img.src = URL.createObjectURL(blob);
                      el.appendChild(img);
                    });
                  }
                }
              }}
            />
          </div>
        )}
        {isTrackLoading ? <div className="mt-2">
          <Skeleton className="w-[300px] rounded-full h-4  bg-secondary dark:bg-primary-foreground" />
        </div> : <>
          {acceptedFiles.length > 0 && (
            <p className="text-primary font-bold">
              {mediaFileInfo &&
                `${mediaFileInfo?.name} / ${formatFileSize(mediaFileInfo?.size)}`}
            </p>
          )}</>}
      </div>
    </section>
  );
}

export default FileDropZone;
