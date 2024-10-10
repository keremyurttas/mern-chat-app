import express from "express";
import mongoose from "mongoose";
// import router from './routes/index.js';
import dotenv from "dotenv";
import router from "./routes/index.js";

const app = express();
const PORT = 3000;
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set.");
}
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on("error", (error) => {
  console.log("database connection error: ", error);
});
app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
