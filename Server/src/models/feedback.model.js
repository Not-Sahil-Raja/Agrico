import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  message: { type: String, required: true },
});

export const feedback = mongoose.model("Feedback", feedbackSchema);
