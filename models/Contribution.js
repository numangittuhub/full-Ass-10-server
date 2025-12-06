// models/Contribution.js
import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  issueId: { type: String, required: true },
  issueTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  date: { type: Date, default: Date.now }
});

const Contribution = mongoose.model("Contribution", contributionSchema);
export default Contribution;