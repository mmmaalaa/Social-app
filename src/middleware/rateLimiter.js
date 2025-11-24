import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// Rate limiter for resend email route
export const verifyOTPLimiter = rateLimit({
  windowMs: 60 * 1000 , //? 1 minute
  max: 3, //? 3 requests
  message: {
    status: "error",
    message: "Too many verify OTP requests. Please try again later.",
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

// General rate limiter for auth routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    status: "error",
    message: "Too many requests from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
