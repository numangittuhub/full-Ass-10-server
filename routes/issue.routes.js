// routes/issue.routes.js
import express from "express";
import upload from "../middlewares/upload.js";
import {
  createIssue,
  getAllIssues,
  getIssueById,
} from "../controllers/issue.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createIssue);
router.get("/", getAllIssues);
router.get("/:id", getIssueById);

export default router;