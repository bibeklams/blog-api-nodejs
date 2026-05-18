import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});