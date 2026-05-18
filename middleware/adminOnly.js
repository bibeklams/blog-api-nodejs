const adminOnly=(req,res,next)=>{
 try {
  if(req.user.role!=="admin"){
  const error=new Error("Access denied. Only admin can access");
  error.statusCode=403;
  throw error
 }
 next();
 } catch (error) {
  next(error)
 }
}
export default adminOnly;