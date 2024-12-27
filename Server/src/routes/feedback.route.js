import express from "express";
import { feedback } from "../models/feedback.model.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newfeedback = new feedback({
      userName: name,
      userEmail: email,
      message: message,
    });

    const feedbackObj = newfeedback.save();

    res.status(201).json({ message: "feedback added !", feedbackObj });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to send feedback !" });
  }
});

export default router;
