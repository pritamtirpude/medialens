export const ERRORTYPE = {
  INVALID_FILE_TYPE: "file-invalid-type",
  FILE_TOO_LARGE: "file-too-large",
  FILE_TOO_SMALL: "file-too-small",
  TOO_MANY_FILES: "too-many-files",
} as const;

export type ERRORTYPE = (typeof ERRORTYPE)[keyof typeof ERRORTYPE];

export type FileInfo = {
  path: string;
  relativePath: string;
  lastModified: number;
  lasModifiedDate: Date;
  size: number;
  type: string;
  name: string;
  webkitRelativePath?: string;
};

export type FileError = {
  code: ERRORTYPE;
  message: string;
};

export type FileRejection = {
  file: FileInfo;
  errors: FileError[];
};

export type FileRejectionList = FileRejection[];
