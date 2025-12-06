// routes/contribution.routes.js
import express from "express";
import Contribution from "../models/Contribution.js";

const router = express.Router();

// POST - নতুন কন্ট্রিবিউশন
router.post("/", async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    await newContribution.save();
    res.status(201).json(newContribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - নিজের কন্ট্রিবিউশন
router.get("/my/:email", async (req, res) => {
  try {
    const contributions = await Contribution.find({ 
      email: req.params.email 
    }).sort({ date: -1 });
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;