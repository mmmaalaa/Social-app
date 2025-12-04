import { Router } from "express";
import { authentication } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import {
  createCommentValidtion,
  updateCommentValidtion,
  deleteCommentValidtion,
  replayValidtion,
} from "./comments.validation.js";
import {
  addReplay,
  createComment,
  deleteComment,
  getComments,
  getLikesComments,
  likesUnlikeComment,
  updateComment,
} from "./comments.services.js";
import { uploadsCloud } from "../../utils/uploads.js";

const router = Router({ mergeParams: true });
router.post(
  "/",
  authentication,
  uploadsCloud().single("image"),
  validation(createCommentValidtion),
  createComment
);
router.patch(
  "/:id",
  authentication,
  uploadsCloud().single("image"),
  validation(updateCommentValidtion),
  updateComment
);
router.delete(
  "/:id",
  authentication,
  validation(deleteCommentValidtion),
  deleteComment
);
router.post(
  "/:id/replay",
  authentication,
  uploadsCloud().single("image"),
  validation(replayValidtion),
  addReplay
);
router.post("/:id", authentication, likesUnlikeComment);
router.get("/:id", authentication, getLikesComments);
router.get("/", authentication, getComments);
export default router;
