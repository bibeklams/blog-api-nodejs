import express from "express";
import protect from "../middleware/protect.js";

import {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", protect, createPost);
router.get("/post", protect, getAllPost);
router.get("/post/:id", protect, getSinglePost);
router.put("/post/:id", protect, updatePost);
router.delete("/post/:id", protect, deletePost);
router.put("/post/like/:id", protect, likePost);

export default router;