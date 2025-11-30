import Joi from "joi";

export const updateProfileValidation = Joi.object({
  username: Joi.string().min(3).max(20),
});

export const updateEmailValidation = Joi.object({
  newEmail: Joi.string().email().required(),
});

export const updatePasswordValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .pattern(/^[A-Z]{1}[a-z]{2}[0-9]{3}$/)
    .required(),
});
