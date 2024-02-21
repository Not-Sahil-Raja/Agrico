import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
  data: {
    type: String,
  },
  point1: {
    type: String,
  },
  point2: {
    type: String,
  },
  point3: {
    type: String,
  },
  link: {
    type: String,
  },
});

export const Course = mongoose.model("allcourses", courseSchema);
