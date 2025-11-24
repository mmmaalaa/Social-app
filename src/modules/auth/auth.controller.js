import { Router } from "express";
import {
  register,
  reSendOTP,
  requestOtp,
  forgetPassword,
  resetPassword,
  login,
  refreshToken,
} from "./auth.services.js";
import { authLimiter } from "../../middleware/rateLimiter.js";
import { validation } from "../../middleware/validation.js";
import {
  registerSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  loginSchema,
} from "./auth.validation.js";
import { verifyOTP } from "../../middleware/verifyOTP.js";

const router = Router();
router.post("/requestOtp", authLimiter, requestOtp);

router.post("/register", validation(registerSchema), verifyOTP, register);

router.post("/reSendOTP", authLimiter, reSendOTP);

router.post(
  "/forgetPassword",
  validation(forgetPasswordSchema),

  forgetPassword
);

router.post(
  "/resetPassword",
  validation(resetPasswordSchema),
  verifyOTP,
  resetPassword
);

router.post("/login", validation(loginSchema), login);
router.post("/refreshToken", refreshToken);

export default router;
