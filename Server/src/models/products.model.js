import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "SellerDetails",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  itemInStock: { type: Boolean, required: true },
  itemImage: { type: String },
});

export const Product = mongoose.model("Products", productSchema);
