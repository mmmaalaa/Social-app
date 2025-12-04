import connectDB from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comments/comments.controller.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const bootstrap = async (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  await connectDB();
  app.use("/api/v1/uploads", express.static("uploads"));
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/comment", commentRouter);

  app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });
  // global error handler
  app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
      message: error.message,
      code: error.statusCode || 500,
    });
  });
};

export default bootstrap;
