import UserModel from "../DB/models/user.model.js";
import appError from "../utils/appError.js";
import { verifyToken } from "../utils/tokens.js";
import asyncHandler from "./asyncHandler.js";

export const authentication = asyncHandler(async (req, res, next) => {
  const {access} = req.cookies;
  if (!access) {
    const error = new appError().create("Unauthorized", 401);
    return next(error);
  }
  const payload = verifyToken(access);

  const user = await UserModel.findById(payload.id).select("-password -__v");
  if (!user) {
    const error = new appError().create("user not found", 401);
    return next(error);
  }
  req.user = user;
  next();
});
