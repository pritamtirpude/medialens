import { ERRORTYPE } from "@/types";
import { clsx, type ClassValue } from "clsx";
import type { FileRejection } from "react-dropzone";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (fileRejections: readonly FileRejection[]) => {
  if (fileRejections.length === 0 || fileRejections[0].errors.length === 0) {
    return null;
  }

  const errorCode = fileRejections[0].errors[0].code;

  switch (errorCode) {
    case ERRORTYPE.INVALID_FILE_TYPE:
      return {
        code: ERRORTYPE.INVALID_FILE_TYPE,
        message: "Invalid file type. Please upload an audio or video file.",
      };
    case ERRORTYPE.TOO_MANY_FILES:
      return {
        code: ERRORTYPE.TOO_MANY_FILES,
        message: "Too many files. Please upload only one file.",
      };
    default:
      return {
        code: errorCode,
        message: "File upload error. Please try again.",
      };
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const tabsList = ["general", "video", "audio"];
