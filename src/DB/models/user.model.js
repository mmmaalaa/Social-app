import { model, Schema } from "mongoose";
import { hashPassword } from "../../utils/hashing.js";
import path from "path";
export const defaultImage = path.join("uploads", "defaultImage.png");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    isActive: { type: Boolean, default: false },
    pendingEmail: { type: String },
    emailToken: { type: String },
    pendingEmailExpires: { type: Date },
    profilePicture: {
      secure_url: {
        type: String,
        default:
          "https://res.cloudinary.com/dntkad2wi/image/upload/v1764542685/NotebookLM_Mind_Map_ndagcz.png",
      },
      public_id: { type: String, default: "NotebookLM_Mind_Map_ndagcz.png" },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = hashPassword(this.password);
  next();
});
const UserModel = model("User", userSchema);

export default UserModel;
