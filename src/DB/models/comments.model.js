import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    post: { type: Types.ObjectId, ref: "Post", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    text: {
      type: String,
      required: function () {
        return this.image ? false : true;
      },
    },
    image: { secure_url: String, public_id: String },
    cloudFolder: { type: String },
    parentComment: { type: Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
commentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
});
const Comment = model("Comment", commentSchema);

export default Comment;
