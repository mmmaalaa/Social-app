import Comment from "../../DB/models/comments.model.js";
import LikesComments from "../../DB/models/likesComments.model.js";
import Post from "../../DB/models/post.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError, { createError } from "../../utils/appError.js";
import cloudinary, { uploadSingle } from "../../utils/cloudinary.js";

export const createComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId, isDeleted: false });
  if (!post) return next(new appError().create("post not found", 404));
  let result;
  if (req.file) {
    result = await uploadSingle(
      req.file,
      `Socail/${post.user}/posts/${post.folder}/comments`
    );
  }
  const comment = await Comment.create({
    post: req.params.postId,
    user: req.user._id,
    text: req.body.text,
    image: result
      ? {
          secure_url: result.secure_url,
          public_id: result.public_id,
        }
      : null,
    cloudFolder: result ? `${post.folder}/comments` : null,
  });
  return res.status(200).json({ status: "success", data: { comment } });
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (req.file) {
    await cloudinary.uploader.destroy(comment.image.public_id);
    const { secure_url, public_id } = await uploadSingle(
      req.file,
      `Socail/${req.user._id}/posts/${comment.cloudFolder}`
    );
    comment.image = {
      secure_url,
      public_id,
    };
  }
  comment.text = req.body.text ? req.body.text : comment.text;
  await comment.save();
  return res.status(200).json({ status: "sucess", comment });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return next(createError("comment not found", 404));
  if (comment.image) {
    await cloudinary.uploader.destroy(comment.image.public_id);
  }
  await comment.deleteOne();
  return res.status(204).end();
});

export const likesUnlikeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return next(createError("comment not found", 404));
  const existing = await LikesComments.findOne({
    comment: req.params.id,
    user: req.user._id,
  });
  if (existing) {
    await LikesComments.findByIdAndDelete(existing._id);
    return res.status(200).json({ status: "sucess", message: "unliked" });
  }
  await LikesComments.create({
    comment: req.params.id,
    user: req.user._id,
  });
  return res.status(200).json({ status: "sucess", message: "liked" });
});

export const getLikesComments = asyncHandler(async (req, res, next) => {
  const count = await LikesComments.countDocuments({ comment: req.params.id });
  res.status(200).json({ likes: count });
});

export const addReplay = asyncHandler(async (req, res, next) => {
  const { postId, id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) return next(createError("comment not found", 404));
  const post = await Post.findById(postId);
  if (!post) return next(createError("post not found", 404));

  let result;
  if (req.file) {
    result = await uploadSingle(
      req.file,
      `Socail/${req.user._id}/posts/${post.cloudFolder}/comments/${comment._id}`
    );
  }
  const replay = await Comment.create({
    post: postId,
    user: req.user._id,
    text: req.body.text,
    parentComment: id,
    image: result
      ? {
          secure_url: result.secure_url,
          public_id: result.public_id,
        }
      : null,
    cloudFolder: result ? `${post.cloudFolder}/comments/${comment._id}` : null,
  });
  return res.status(200).json({ status: "sucess", replay });
});

export const getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.params.postId,
    parentComment: { $exists: false },
  })
    .populate({
      path: "user",
      select: "username profilePicture.secure_url -_id",
    })
    .populate({
      path: "replies",
      select: "text image user -_id",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ comments });
});
