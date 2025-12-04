import { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    text: {
      type: String,
      minLength: 5,
      maxLength: 1000,
      required: function () {
        return this.images.length ? false : true;
      },
    },
    images: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    user: { type: Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    folder: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});
const Post = model("Post", postSchema);

export default Post;
