import multer, { diskStorage, memoryStorage } from "multer";
import { nanoid } from "nanoid";

export const fileValidation = {
  image: ["image/jpeg", "image/png"],
};
export const uploads = (fileType) => {
  const storage = diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, nanoid() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (fileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
  return multer({ storage, fileFilter });
};

export const uploadsCloud = () => {
  const storage = memoryStorage();

  return multer({ storage });
};
