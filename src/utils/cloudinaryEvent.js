import { EventEmitter } from "events";
import cloudinary from "./cloudinary.js";
const cloudinaryEvent = new EventEmitter();

cloudinaryEvent.on("uploadImage", async (path, folderName, public_id) => {
  const result = await cloudinary.uploader.upload(path, {
    folder: folderName,
    public_id,
    overwrite: true,
  });
  console.log(result)
  return result;
});

export default cloudinaryEvent;
