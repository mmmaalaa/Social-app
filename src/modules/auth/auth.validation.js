import joi from "joi";

// Reusable field validators
const emailField = joi.string().email().required();

const passwordField = joi
  .string()
  .min(6)
  .required()
  .pattern(/^[A-Z]{1}[a-z]{2}[0-9]{3}$/);

const usernameField = joi.string().min(3).max(20).required();

// Schema definitions
export const registerSchema = joi.object({
  username: usernameField,
  email: emailField,
  password: passwordField,
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  otp: joi.string().length(6).required(),
});

export const loginSchema = joi.object({
  email: emailField,
  password: passwordField,
});

export const resendEmailSchema = joi.object({
  email: emailField,
});

export const forgetPasswordSchema = joi.object({
  email: emailField,
});

export const resetPasswordSchema = joi.object({
  email: emailField,
  password: passwordField,
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  otp: joi.string().length(6).required(),
});
