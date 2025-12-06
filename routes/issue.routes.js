// routes/issue.routes.js
import express from "express";
import upload from "../middlewares/upload.js";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issue.controller.js";

const router = express.Router();

// Create Issue
router.post("/", upload.single("image"), createIssue);

// Get All Issues
router.get("/", getAllIssues);

// Get Single Issue
router.get("/:id", getIssueById);

// Update Issue (only own)
router.patch("/:id", updateIssue);

// Delete Issue (only own)
router.delete("/:id", deleteIssue);

export default router;