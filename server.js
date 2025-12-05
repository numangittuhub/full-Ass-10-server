// server.js
import express from "express";
import mongoose from "mongoose";
import issueRoutes from "./routes/issue.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary কনফিগ সরাসরি এখানে — ১০০% লোড হবেই
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ডিবাগ: দেখাও কী লোড হলো
console.log("Cloudinary Config:");
console.log("Cloud Name:", cloudinary.config().cloud_name || "Missing!");
console.log("API Key:", cloudinary.config().api_key ? "Loaded" : "Missing!");
console.log("API Secret:", cloudinary.config().api_secret ? "Loaded" : "Missing!");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Test Route
app.get("/", (req, res) => {
  res.send(`
    <h1 style="text-align:center; margin-top:100px; color:green;">
      Community Cleanliness Server is Running Perfectly!
    </h1>
  `);
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    app.use("/api/issues", issueRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("Everything is 100% Ready! Go ahead and post an issue! ");
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });