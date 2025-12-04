import asyncHandler from "../../middleware/asyncHandler.js";
import cloudinary, { uploadSingle } from "../../utils/cloudinary.js";
import Post from "../../DB/models/post.model.js";
import { nanoid } from "nanoid";
import { createError } from "../../utils/appError.js";
import Likes from "../../DB/models/likes.model.js";

export const creatPost = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  let images = [];
  const folder = nanoid();
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map((file) =>
      uploadSingle(file, `Socail/${req.user._id}/posts/${folder}`)
    );
    const results = await Promise.all(uploadPromises);
    images = results.map((result) => ({
      secure_url: result.secure_url,
      public_id: result.public_id,
    }));
  }
  const post = await Post.create({
    text,
    images,
    user: req.user._id,
    folder,
  });
  res.status(200).json({ message: "Post created successfully", post });
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { text, removedPhotos } = req.body;
  const post = await Post.findOne({ _id: id, user: req.user._id });
  if (!post) return next(createError("post not found", 404));
  let parsedRemoves = [];
  if (removedPhotos) {
    parsedRemoves = JSON.parse(removedPhotos);
  }

  if (parsedRemoves.length > 0) {
    const destroyPromises = parsedRemoves.map((pubId) => {
      cloudinary.uploader.destroy(pubId);
    });
    await Promise.all(destroyPromises);
    post.images = post.images.filter(
      (img) => !parsedRemoves.includes(img.public_id)
    );
  }
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map((file) =>
      uploadSingle(file, `Socail/${req.user._id}/posts/${post.folder}`)
    );

    const results = await Promise.all(uploadPromises);

    const newImages = results.map((r) => ({
      secure_url: r.secure_url,
      public_id: r.public_id,
    }));

    post.images.push(...newImages);
  }
  post.text = text ? text : post.text;
  await post.save();
  return res.status(200).json({ status: "sucess", post });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
  if (!post) return next(createError("post not found", 404));
  post.isDeleted = true;
  post.deletedAt = Date.now();
  await post.save();
  return res.status(204).json({ status: true });
});

export const restorePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
      isDeleted: true,
    },
    {
      isDeleted: false,
      $unset: { deletedAt: 0 },
    },
    {
      new: true,
    }
  );
  if (!post) return next(createError("post not found", 404));
  return res.status(200).json({ status: "sucess", post });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate([
    { path: "user", select: "username profilePicture.secure_url" },
    { path: "comments" },
  ]);
  if (!post) return next(createError("post not found", 404));
  return res.status(200).json({
    status: "sucess",
    data: {
      post,
      likes: await Likes.countDocuments({ post: post._id }),
    },
  });
});

export const likesUnlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(createError("post not found", 404));
  const existing = await Likes.findOne({
    post: req.params.id,
    user: req.user._id,
  });
  if (existing) {
    await Likes.findByIdAndDelete(existing._id);
    return res.status(200).json({ status: "sucess", message: "unliked" });
  }
  await Likes.create({
    post: req.params.id,
    user: req.user._id,
  });
  return res.status(200).json({ status: "sucess", message: "liked" });
});

export const getPostLikes = asyncHandler(async (req, res, next) => {
  const count = await Likes.countDocuments({ post: req.params.id });
  res.status(200).json({ likes: count });
});
