import express from "express";
import { upload } from "../config/multerConfig.js";

import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getFeedPosts);
router.get("/:userId/userPosts", getUserPosts);
router.post("/", upload.single("picture"), createPost);
router.patch("/:postId/like", likePost);

export default router;
