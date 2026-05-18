import express from "express";
import protect from "../middleware/protect.js";
import adminOnly from "../middleware/adminOnly.js";
import { signUp,login,getAllUser,getSingleUser } from "../controllers/authController.js";
const router=express.Router();

router.post("/signUp",signUp);
router.post("/login",login);
router.get("/users",protect,adminOnly,getAllUser);
router.get("/users/:id",protect,adminOnly,getSingleUser);

export default router;
