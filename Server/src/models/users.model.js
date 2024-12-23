import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unigue: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("userdetails", userSchema);
