import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadSingle = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const compressed = await sharp(file.buffer)
        .resize(600)
        .jpeg({ quality: 70 })
        .toBuffer();
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(compressed);
    } catch (err) {
      reject(err);
    }
  });
};

export default cloudinary;
