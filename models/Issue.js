// models/Issue.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "ongoing" },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Issue", issueSchema);