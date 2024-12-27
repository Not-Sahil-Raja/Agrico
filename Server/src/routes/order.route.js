import express from "express";
import { Orders } from "../models/orders.model.js";
import { User } from "../models/users.model.js";
import { Product } from "../models/products.model.js";
import { Inventory } from "../models/inventorydetails.model.js";

const router = express.Router();

router.post("/place-orders", async (req, res) => {
  const { products, userEmail, userName, paymentDetail, shippingDetail } =
    req.body;

  if (
    !products ||
    !userEmail ||
    !userName ||
    !paymentDetail ||
    !paymentDetail.PaymentMethod ||
    !shippingDetail ||
    !shippingDetail.CustomerName ||
    !shippingDetail.Country ||
    !shippingDetail.Address ||
    !shippingDetail.City ||
    !shippingDetail.State ||
    !shippingDetail.PostalCode ||
    !shippingDetail.PhoneNumber
  )
    return res.status(401).json({ message: "Required fileds are not filled" });

  try {
    let user = await User.findOne({ email: userEmail });
    if (!user)
      user = new User({
        username: userName,
        email: userEmail,
      });

    let total = 0;

    for (const item of products) {
      total = parseInt(total) + parseInt(item.price) * parseInt(item.quantity);
      const product = await Product.findById(item._id);
      if (!product || product.quantity < item.quantity)
        return res.status(400).json({
          message: "Can't find the product or Not enough product's quantity",
        });

      product.quantity -= item.quantity;

      const updateFields = { totalItems: -1 * item.quantity };

      if (product.quantity < 10) {
        updateFields.lowStockItems = 1;
      }
      if (product.quantity == 0) {
        updateFields.outOfStockItems = 1;
        product.itemInStock = false;
      }

      await Inventory.updateOne(
        { sellerId: item.sellerId },
        { $inc: updateFields }
      );
      await product.save();
    }
    const newOrder = new Orders({
      userId: user._id,
      products,
      paymentDetail,
      shippingDetail,
      total,
      status: "processing",
    });
    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "order placed successfully !", savedOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to place the order !!" });
  }
});

export default router;
