import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "SellerDetails",
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "userdetails", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  status: { type: String, required: true },
});

export const Orders = mongoose.model("Orders", orderSchema);
