import OTP from "../DB/models/otp.model.js";
import { comparePassword } from "../utils/hashing.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createError } from "../utils/appError.js";

/**
 * Verify OTP and activate user account
 */

export const verifyOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  const recordedOtp = await OTP.findOne({ email });
  if (!recordedOtp) {
    return next(createError("OTP not found or expired", 404));
  }

  // Check if too many failed attempts
  if (recordedOtp.attempts >= 5) {
    await OTP.deleteOne({ email }); // Clean up after max attempts
    return next(
      createError("Too many failed attempts. Please request a new OTP", 429)
    );
  }

  // Verify OTP
  const isOTPValid = comparePassword(otp, recordedOtp.otp);

  if (!isOTPValid) {
    recordedOtp.attempts += 1;
    await recordedOtp.save();

    return next(
      createError(
        `Invalid OTP. ${5 - recordedOtp.attempts} attempts remaining`,
        401
      )
    );
  }

  // OTP is valid - activate user and clean up

  await OTP.deleteOne({ email });

  return next();
});
