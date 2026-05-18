import express from "express";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from"./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",authRoutes);
app.use("/api",postRoutes);
app.use("/api",commentRoutes);
app.use(errorMiddleware);

export default app;