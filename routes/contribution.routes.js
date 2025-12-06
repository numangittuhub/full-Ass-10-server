// routes/contribution.routes.js
import express from "express";
import Contribution from "../models/Contribution.js";

const router = express.Router();

// POST - নতুন কন্ট্রিবিউশন সেভ করা
router.post("/", async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    await newContribution.save();
    res.status(201).json(newContribution);
  } catch (error) {
    console.error("Contribution save error:", error);
    res.status(500).json({ message: "Failed to save contribution" });
  }
});

// GET - নিজের সব কন্ট্রিবিউশন দেখা
router.get("/my/:email", async (req, res) => {
  try {
    const contributions = await Contribution.find({ 
      email: req.params.email 
    }).sort({ date: -1 });
    res.json(contributions);
  } catch (error) {
    console.error("Get contributions error:", error);
    res.status(500).json({ message: "Failed to fetch contributions" });
  }
});

export default router;