// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import issueRoutes from "./routes/issue.routes.js";
import contributionRoutes from "./routes/contribution.routes.js"; // নতুন রুট
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Loaded:", !!cloudinary.config().cloud_name);

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/issues", issueRoutes);
app.use("/api/contributions", contributionRoutes); // এই লাইনটা যোগ করো

// Test Route
app.get("/", (req, res) => {
  res.send(`
    <h1 style="text-align:center; margin-top:100px; color:green; font-size:3rem;">
      Community Cleanliness Server Running!
    </h1>
  `);
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });