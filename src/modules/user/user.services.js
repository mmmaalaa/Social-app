import UserModel, { defaultImage } from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";
import { comparePassword, hashPassword } from "../../utils/hashing.js";
import sendEmail from "../../utils/sendEmail.js";
import crypto from "node:crypto";
import cloudinary, { uploadSingle } from "../../utils/cloudinary.js";
import sharp from "sharp";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: "success",
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -__v -_id -email -createdAt -updatedAt -isActive");
  return res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

export const updateEmail = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { newEmail } = req.body;
  const exists = await UserModel.findOne({ email: newEmail });
  if (exists) {
    const error = new appError().create("email already exist", 400);
    return next(error);
  }
  const user = await UserModel.findById(userId);
  const token = crypto.randomBytes(32).toString("hex");
  user.pendingEmail = newEmail;
  user.emailToken = token;
  user.pendingEmailExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();
  const link = `${process.env.CLIENT_URL}user/activateEmail/${token}`;
  await sendEmail(
    newEmail,
    "Confir your new email",
    `<h1>click <a href="${link}">here</a> to confirm your new email</h1>`
  );
  return res.status(201).json({
    status: "success",
    message: "verification Sent",
  });
});

export const activateEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await UserModel.findOne({
    emailToken: token,
  });
  if (!user) {
    const error = new appError().create("Invalid or expired token", 404);
    return next(error);
  }
  user.email = user.pendingEmail;
  user.emailToken = undefined;
  user.pendingEmail = undefined;
  user.pendingEmailExpires = undefined;
  user.isActive = true;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "email activated",
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!comparePassword(oldPassword, user.password)) {
    const error = new appError().create("Invalid password", 400);
    return next(error);
  }

  user.password = newPassword;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "password updated",
  });
});

// export const uploadProfilePic = asyncHandler(async (req, res, next) => {
//   const user = await UserModel.findById(req.user._id);
//   user.profilePic = req.file.path;
//   await user.save();
//   const imageUrl = `${process.env.CLIENT_URL}${req.file.path}`;
//   return res.status(200).json({
//     status: "success",
//     message: "profile pic uploaded",
//     imageUrl,
//   });
// });
// export const uploadProfilePic = asyncHandler(async (req, res, next) => {
//   const user = await UserModel.findById(req.user._id);
//   const result = await cloudinary.uploader.upload(req.file.path, {
//     folder: "profile-pictures",
//     public_id: `user_${req.user._id}`,
//     overwrite: true,
//   });
//   user.profilePicture.secure_url = result.secure_url;
//   user.profilePicture.public_id = result.public_id;
//   await user.save();
//   return res.status(200).json({
//     status: "success",
//     message: "profile pic uploaded",
//     url: result.secure_url,
//   });
// });
export const uploadProfilePic = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (!req.file) return next(new appError().create("No file", 400));

  // compress

  const result = await uploadSingle(
    req.file,
    req.user._id,
    `Socail/${req.user._id}/profile_pictures`
  );

  // Update DB
  user.profilePicture = {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "profile pic uploaded",
    url: result.secure_url,
  });
});

export const deleteProfilePic = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  // Check if user has uploaded a custom profile picture
  if (!user.profilePicture.public_id) {
    return next(
      new appError().create("You haven't uploaded a profile picture yet", 400)
    );
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(user.profilePicture.public_id);

  // Reset to default
  user.profilePicture.secure_url =
    "https://res.cloudinary.com/dntkad2wi/image/upload/v1764542685/NotebookLM_Mind_Map_ndagcz.png";
  user.profilePicture.public_id = "NotebookLM_Mind_Map_ndagcz.png";
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "profile pic deleted",
  });
});
