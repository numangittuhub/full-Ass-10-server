// controllers/issue.controller.js
import Issue from "../models/Issue.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create Issue
export const createIssue = async (req, res) => {
  try {
    const { title, category, location, description, amount, email } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image is required" });

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
    res.status(201).json(newIssue);
  } catch (err) {
    console.error("Create Issue Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Issue
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Issue (only owner)
export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // Only owner can update
    if (issue.email !== updates.email) {
      return res.status(403).json({ message: "You can only update your own issues" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedIssue);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Issue (only owner)
export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (issue.email !== email) {
      return res.status(403).json({ message: "You can only delete your own issues" });
    }

    await Issue.findByIdAndDelete(id);
    res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};