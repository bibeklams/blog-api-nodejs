import express from "express";
import protect from "../middleware/protect.js";
import { createComment } from "../controllers/commectController.js";

const router=express.Router();

router.post("/comment/:postId",protect,createComment);

export default router;