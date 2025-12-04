import { model, Schema, Types } from "mongoose";

const likesSchema = new Schema(
  {
    post: { type: Types.ObjectId, ref: "Post", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
likesSchema.index({ post: 1, user: 1 }, { unique: true });

const Likes = model("Likes", likesSchema);

export default Likes;