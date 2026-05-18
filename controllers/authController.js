import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signUp=async (req,res,next) => {
  try {
    const {name,email,password}=req.body;
    const existing=await User.findOne({email});
    if(existing){
      const error=new Error("user already exists");
      error.statusCode=400;
      throw error;
    }
    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hashed});
    res.status(201).json({
      success:true,
      message:"User created successfully",
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
    })
   
  } catch (error) {
    next(error)
  }
}
export const login=async (req,res,next) => {
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      const error=new Error("No user found");
      error.statusCode=404;
      throw error;
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      const error=new Error("Invalid Password");
      error.statusCode=400;
      throw error;
    }
     const token=jwt.sign({id:user._id,role:user.role},process.env.JWT,{expiresIn:"1d"});
     
     res.status(200).json({
      success:true,
      message:"User login successfully",
      token,
      email:user.email,
      role:user.role,
     })
  } catch (error) {
    next(error)
  }
}
export const getAllUser=async (req,res,next) => {
  try {
    const allUser=await User.find({role:"user"}).select("-password");
    if(allUser.length===0){
      const error=new Error("No user found");
      error.statusCode=404;
      throw error;
    }
    res.status(200).json({
      success:true,
      allUser
    })
  } catch (error) {
    next(error)
  }
}
export const getSingleUser=async (req,res,next) => {
  try {
    const user= await User.findById(req.params.id).select("-password");
    if(!user){
      const error=new Error("No user found");
      error.statusCode=404;
      throw error;
    }
    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    next(error)
  }
}