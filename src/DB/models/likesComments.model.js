import { model, Schema, Types } from "mongoose";

const likesCommentsSchema = new Schema(
  {
    comment: { type: Types.ObjectId, ref: "Comment", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
likesCommentsSchema.index({ post: 1, user: 1 }, { unique: true });

const LikesComments = model("LikesComment", likesCommentsSchema);

export default LikesComments;