import Post from "../models/Post.js";

export const createPost=async (req,res,next) => {
  try {
    const {title,content}=req.body;
    const post=await Post.create({
      title,content,auther:req.user.id
    })
    res.status(201).json({
      success:true,
      message:"Created post successfully"
    })
  } catch (error) {
    next(error);
  }
}
export const getAllPost=async (req,res,next) => {
  try {
    const posts=await Post.find().populate("auther","name email");
    if(posts.length===0){
      const error=new Error("No post found");
      error.statusCode=404;
      throw error;
    }
    res.status(200).json({
      success:true,
      posts,
    })
  } catch (error) {
    next(error)
  }
}
export const getSinglePost=async (req,res,next) => {
  try {
    const post=await Post.findById(req.params.id);
    if(!post){
       const error=new Error("No post found");
      error.statusCode=404;
      throw error;
    }
    res.status(200).json({
      success:true,
      post,
    })
  } catch (error) {
    next(error)
  }
}
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw error;
    }

    if (post.auther.toString() !== req.user.id) {
      const error = new Error("Not authorized to delete this post");
      error.statusCode = 403;
      throw error;
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    next(error);
  }
};
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw error;
    }

    if (post.auther.toString() !== req.user.id) {
      const error = new Error("Not authorized to update this post");
      error.statusCode = 403;
      throw error;
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};
export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
      });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked",
    });
  } catch (error) {
    next(error);
  }
};