import express from "express";
import { Course } from "../models/courses.model.js";

const router = express.Router();

router.get("/courses/:no", async (req, res) => {
  try {
    const coursenow = req.params.no;
    console.log("courseNow", coursenow);
    const foundcourse = await Course.findOne({ topic: coursenow });
    return res.status(200).json(foundcourse);
  } catch (e) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/allcourses", async (req, res) => {
  try {
    const allcourses = await Course.find({});
    return res.json(allcourses);
  } catch (e) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
