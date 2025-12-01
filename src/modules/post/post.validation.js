import joi from "joi";

const fileValidation = {
  fieldname: joi.string(),
  originalname: joi.string(),
  encoding: joi.string(),
  mimetype: joi.string(),
  size: joi.number(),
  destination: joi.string(),
  filename: joi.string(),
  path: joi.string(),
};
export const createPostValidtaion = joi
  .object({
    text: joi.string().min(5).max(1000),
    file: joi.array().items(joi.object(fileValidation).unknown(true)),
  })
  .or("text", "images");
export const updatePostValidtaion = joi
  .object({
    text: joi.string().min(5).max(1000),
    file: joi.array().items(joi.object(fileValidation).unknown(true)),
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    removedPhotos: joi.string(),
  })
  .or("text", "images");

export const deletePostValidtaion = joi.object({
  id: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});
