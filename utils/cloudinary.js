// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// এই কনফিগটা সার্ভার শুরুতেই লোড হবে
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ডিবাগের জন্য কনসোলে দেখাও কী লোড হচ্ছে
console.log("Cloudinary Config Loaded:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "❌ Missing!");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing!");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing!");

// এক্সপোর্ট
export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "clean-city", resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

export default cloudinary;
