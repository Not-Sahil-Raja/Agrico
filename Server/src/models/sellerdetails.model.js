import mongoose from "mongoose";

const sellerdetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

export const sellerDetail = mongoose.model(
  "SellerDetails",
  sellerdetailsSchema
);
