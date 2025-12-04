import joi from "joi";
const validateId = joi
  .string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();
export const createCommentValidtion = joi
  .object({
    postId: validateId,
    text: joi.string(),
  })
  .required();
export const updateCommentValidtion = joi
  .object({
    id: validateId,
    text: joi.string(),
  })
  .required();
export const deleteCommentValidtion = joi
  .object({
    id: validateId,
  })
  .required();

export const toggleLikes = joi
  .object({
    id: validateId,
  })
  .required();
export const replayValidtion = joi
  .object({
    id: validateId,
    text: joi.string(),
    postId: validateId,
  })
  .required();
