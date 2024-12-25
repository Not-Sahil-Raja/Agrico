import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userdetails", required: true },
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  paymentDetail: {
    PaymentMethod: { type: String, required: true },
    UpiId: { type: String },
    CardNumber: { type: String },
    Expiration: { type: String },
    SecurityCode: { type: String },
    VoucherCode: { type: String },
  },
  shippingDetail: {
    CustomerName: { type: String, required: true },
    Country: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    PostalCode: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  status: { type: String, required: true },
});

export const Orders = mongoose.model("Orders", orderSchema);
