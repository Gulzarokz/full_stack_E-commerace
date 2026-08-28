import multer from "multer";

const storage = multer.memoryStorage();

// singlefile uplader
export const singleFileUpload = multer({ storage }).single('file');

export const multipleFileUpload = multer({ storage }).array('files', 5);