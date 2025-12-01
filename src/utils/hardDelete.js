import { CronJob } from "cron";
import Post from "../DB/models/post.model.js";
import cloudinary from "./cloudinary.js";

const hardDeleteJob = new CronJob(
  "0 0 0 * * *", // كل يوم الساعة 00:00
  async () => {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const posts = await Post.find({
      isDeleted: true,
      deletedAt: { $lte: Date.now() - THIRTY_DAYS },
    }).limit(100);

    for (const post of posts) {
      if (post.images?.length) {
        for (const img of post.images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      await Post.findByIdAndDelete(post._id);
    }

    console.log(`Hard deleted ${posts.length} posts`);
  }
);

const startHardDelete = () => {
  hardDeleteJob.start();
  console.log("Hard delete cron job started");
};

export default startHardDelete;
