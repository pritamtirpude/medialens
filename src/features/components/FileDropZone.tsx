import { cn, formatFileSize, getErrorMessage } from "@/lib/utils";
import { useTrackStore } from "@/store/tracksStore";
import { Upload } from "lucide-react";
import { ALL_FORMATS, BlobSource, Input } from "mediabunny";
import { useDropzone } from "react-dropzone";

function FileDropZone() {
  const { setInputTracks } = useTrackStore();

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
      if (acceptedFiles.length > 0) {
        const input = new Input({
          formats: ALL_FORMATS,
          source: new BlobSource(acceptedFiles[0]),
        });

        setInputTracks(input);
      }
    },
  });

  const errorMessage =
    fileRejections.length > 0 ? getErrorMessage(fileRejections) : null;

  const mediaFileInfo = acceptedFiles.length > 0 ? acceptedFiles[0] : null;

  return (
    <section className="">
      <div
        {...getRootProps({
          className: cn(
            "min-h-64 flex justify-center flex-col items-center border-4 cursor-pointer border-blue-400 border-dashed p-4 rounded-md transition duration-150",
            isDragActive || isFocused ? "border-blue-200" : "",
            fileRejections?.length > 0 ? "border-red-400" : ""
          ),
        })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-2">
            <Upload className="text-blue-500" size={50} />
            <p className="text-gray-400">Drag & drop a file here</p>
          </div>
        )}
        {errorMessage && <p className="text-red-400">{errorMessage.message}</p>}
        {acceptedFiles.length > 0 && (
          <p className="text-2xl text-white font-bold">
            {mediaFileInfo &&
              `${mediaFileInfo?.name} / ${formatFileSize(mediaFileInfo?.size)}`}
          </p>
        )}
      </div>
    </section>
  );
}

export default FileDropZone;
