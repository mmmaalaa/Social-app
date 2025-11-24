import OTP from "../../DB/models/otp.model.js";
import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { createError } from "../../utils/appError.js";
import emailEmitter from "../../utils/emailEvent.js";
import { generateOTP } from "../../utils/generateOTP.js";

import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../../utils/tokens.js";
import { setAuthCookie, tokenRoles } from "../../utils/setAuthCookie.js";
import { comparePassword } from "../../utils/hashing.js";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a user response object (without sensitive data)
 */
const createUserResponse = (user) => ({
  email: user.email,
  username: user.username,
  id: user._id,
});

/**
 * Generate and send OTP to user
 * @param {Object} user - User document
 * @returns {Promise<void>}
 */
const generateAndSendOTP = async (email) => {
  // Delete any existing OTPs for this user
  await OTP.deleteMany({ email });

  // Generate plain OTP for email
  const plainOTP = generateOTP();

  // Hash OTP for database storage
  const hashedOTP = bcrypt.hashSync(plainOTP, Number(process.env.SALT_ROUNDS));

  // Store hashed OTP in database
  await OTP.create({ email, otp: hashedOTP });

  // Send plain OTP to user's email
  emailEmitter.emit("sendEmail", email, plainOTP);
};

// ============================================
// AUTH SERVICES
// ============================================

/**
 * request and send OTP
 */
export const requestOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  await generateAndSendOTP(email);
  return res.status(200).json({
    status: "success",
    message: "OTP has been sent to your email",
  });
});
/**
 * Register a new user and send OTP
 */
export const register = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create({ ...req.body, isActive: true });

  res.status(201).json({
    status: "success",
    message: "User has been created successfully",
    data: createUserResponse(user),
  });
});
/**
 * login user
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError("User not found", 404));
  }

  const isPasswordValid = comparePassword(password, user.password);

  if (!isPasswordValid) {
    return next(createError("Invalid password", 401));
  }

  const accessToken = generateToken({ id: user._id });
  setAuthCookie(res, accessToken, tokenRoles.access);
  const refreshToken = generateToken({ id: user._id, expiresIn: "7d" });
  setAuthCookie(res, refreshToken, tokenRoles.refresh);
  res.status(200).json({
    status: "success",
    message: "User has been logged in successfully",
    data: createUserResponse(user),
  });
});
/**
 * Resend OTP to user
 */
export const reSendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return next(createError("Account is already activated", 400));
  }

  await generateAndSendOTP(email);

  return res.status(200).json({
    status: "success",
    message: "OTP has been resent successfully",
  });
});

/**
 * forget Password
 */

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError("User not found", 404));
  }

  await generateAndSendOTP(email);

  return res.status(200).json({
    status: "success",
    message: "OTP has been sent to your email",
  });
});

/**
 * reset Password
 */

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError("User not found", 404));
  }

  user.password = password;

  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password has been reset successfully",
  });
});

export const refreshToken = (req, res, next) => {
  const { refresh } = req.cookies;

  if (!refresh) {
    return next(createError("Unauthorized", 401));
  }
  const { id } = verifyToken(refresh);

  const accessToken = generateToken({ id });
  setAuthCookie(res, accessToken, tokenRoles.access);
  return res.status(200).json({
    status: "success",
    message: "Token has been refreshed successfully",
  });
};
