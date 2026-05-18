import Comment from "../models/Comment.js";

export const createComment=async (req,res,next) => {
  try {
    const {text}=req.body;
    const comment=await Comment.create({text,user:req.user.id,post:req.params.postId})
    res.status(201).json({
      success:true,
      comment
    })
  } catch (error) {
    next(error)
  }
}
export default Comment;