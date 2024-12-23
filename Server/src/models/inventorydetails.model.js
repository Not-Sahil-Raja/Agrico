import mongoose, { Schema } from "mongoose";

const inventorySchema = new mongoose.Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "SellerDetails",
    required: true,
  },
  totalItems: { type: Number, default: 0 },
  lowStockItems: { type: Number, default: 0 },
  outOfStockItems: { type: Number, default: 0 },
  inventoryValue: { type: Number, default: 0 },
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
