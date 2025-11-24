import mongoose from "mongoose";

async function connectDB() {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
}

export default connectDB;