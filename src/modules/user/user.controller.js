import { Router } from "express";
import {
  getUserProfile,
  updateProfile,
  updateEmail,
  activateEmail,
  updatePassword,
  uploadProfilePic,
  deleteProfilePic,
} from "./user.services.js";
import { authentication } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import {
  updateProfileValidation,
  updateEmailValidation,
  updatePasswordValidation,
} from "./user.validation.js";
import { fileValidation, uploads, uploadsCloud } from "../../utils/uploads.js";

const router = Router();
router.get("/profile", authentication, getUserProfile);
router.patch(
  "/profile",
  validation(updateProfileValidation),
  authentication,
  updateProfile
);
router.patch(
  "/updateEmail",
  validation(updateEmailValidation),
  authentication,
  updateEmail
);
router.get("/activateEmail/:token", activateEmail);
router.patch(
  "/updatePassword",
  validation(updatePasswordValidation),
  authentication,
  updatePassword
);

// router.post(
//   "/profilePic",
//   authentication,
//   uploads(fileValidation.image).single("image"),
//   uploadProfilePic
// );
router.post(
  "/profilePic",
  authentication,
  uploadsCloud().single("image"),
  uploadProfilePic
);

router.delete("/profilePic", authentication, deleteProfilePic);
export default router;
