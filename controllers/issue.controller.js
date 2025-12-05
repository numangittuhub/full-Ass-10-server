// controllers/issue.controller.js
import Issue from "../models/Issue.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create Issue (with image)
export const createIssue = async (req, res) => {
  try {
    const { title, category, location, description, amount, email } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image required" });

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const newIssue = new Issue({
      title,
      category,
      location,
      description,
      image: imageUrl,
      amount,
      email,
      status: "ongoing",
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue created!", issue: newIssue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Issue
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Not found" });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};