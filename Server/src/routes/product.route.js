import express from "express";
import streamifier from "streamifier";
import upload from "../middlewares/multer.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import { sellerDetail } from "../models/sellerdetails.model.js";
import { Product } from "../models/products.model.js";

const router = express.Router();

router.post("/add", upload.single("productImg"), async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required" });

  if (
    !req.body.itemName ||
    !req.body.description ||
    !req.body.category ||
    !req.body.price ||
    !req.body.quantity ||
    !req.body.itemInStock
  )
    return res.status(400).json({ message: "Required Fields Are Empty !!" });

  const {
    itemName,
    description,
    category,
    price,
    quantity,
    itemInStock,
    email,
  } = req.body;

  const seller = await sellerDetail.findOne({ email: email });
  if (!seller) return res.status(404).json({ message: "Seller not found" });

  const existingProduct = await Product.findOne({
    sellerId: seller._id,
    name: itemName,
  });
  if (existingProduct) {
    existingProduct.quantity =
      parseInt(existingProduct.quantity) + parseInt(quantity);
    await existingProduct.save();
    return res.status(200).json({ message: "Product quantity updated" });
  }
  let imageUrl = null;

  if (req.file) {
    const file = req.file;
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      if (!result || !result.secure_url) {
        return res.status(500).json({ message: "Failed to upload image" });
      }

      imageUrl = result.secure_url;
    } catch (error) {
      console.log(error);
    }
  }
  const newProduct = new Product({
    sellerId: seller._id,
    name: itemName,
    description: description || "",
    category: category,
    price: price,
    quantity: quantity,
    itemInStock: itemInStock,
    itemImage: imageUrl,
  });

  await newProduct.save();
  res.status(201).json({ message: "Product Added !!" });
});

export default router;
