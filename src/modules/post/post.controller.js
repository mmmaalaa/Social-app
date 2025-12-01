import { Router } from "express";
import { authentication } from "../../middleware/auth.js";
import { uploadsCloud } from "../../utils/uploads.js";
import { validation } from "../../middleware/validation.js";
import {
  createPostValidtaion,
  deletePostValidtaion,
  updatePostValidtaion,
} from "./post.validation.js";
import {
  creatPost,
  deletePost,
  getPost,
  restorePost,
  updatePost,
} from "./post.services.js";

const router = Router();

router.post(
  "/",
  authentication,
  uploadsCloud().array("images"),
  validation(createPostValidtaion),
  creatPost
);
router.patch(
  "/:id",
  authentication,
  uploadsCloud().array("images"),
  validation(updatePostValidtaion),
  updatePost
);
router.delete(
  "/:id",
  authentication,
  validation(deletePostValidtaion),
  deletePost
);
router.patch(
  "/:id/restore",
  authentication,
  validation(deletePostValidtaion),
  restorePost
);
router.get(
  "/:id",
  authentication,
  validation(deletePostValidtaion),
  getPost
);

export default router;
