import { cn, formatFileSize, getErrorMessage } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

function FileDropZone() {
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
  });

  console.log("acceptedfiles", acceptedFiles);
  console.log("filerejections", fileRejections);
  console.log("isdargagactive", isDragActive);

  const errorMessage =
    fileRejections.length > 0 ? getErrorMessage(fileRejections) : null;

  const fileInfo = acceptedFiles.length > 0 ? acceptedFiles[0] : null;

  return (
    <section className="">
      <div
        {...getRootProps({
          className: cn(
            "bg-gray-100 min-h-64 flex justify-center flex-col items-center border-2 border-gray-400 border-dashed p-4 rounded-md transition duration-150",
            isDragActive || isFocused ? "border-blue-400 bg-blue-50" : "",
            fileRejections?.length > 0 ? "border-red-400 bg-red-50" : ""
          ),
        })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 && (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {errorMessage && <p className="text-red-600">{errorMessage.message}</p>}
        {acceptedFiles.length > 0 && (
          <p className="text-2xl font-bold">
            {fileInfo &&
              `${fileInfo?.name} / ${formatFileSize(fileInfo?.size)}`}
          </p>
        )}
      </div>
    </section>
  );
}

export default FileDropZone;
