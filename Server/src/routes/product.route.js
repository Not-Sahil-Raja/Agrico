import express from "express";
import streamifier from "streamifier";
import upload from "../middlewares/multer.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import { sellerDetail } from "../models/sellerdetails.model.js";
import { Product } from "../models/products.model.js";
import { Inventory } from "../models/inventorydetails.model.js";
import { Orders } from "../models/orders.model.js";

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
  const inventoryUpdated = await updateInventoryMetrics(
    seller._id,
    quantity,
    price
  );

  if (!inventoryUpdated.success) {
    return res.status(400).json({
      message: "Inventory Update Failed !!",
      error: inventoryUpdated.error,
    });
  }

  res.status(201).json({ message: "Product Added !! | Inventory Updated !" });
});

router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find({
      itemInStock: true,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
});

router.get("/pagination", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize);
    const pageIndex = parseInt(req.query.pageIndex);
    const category = req.query.category;
    const searchQuery = req.query.search || "";

    const pipeline = [];

    if (searchQuery) {
      pipeline.push({
        $search: {
          index: "name",
          text: {
            query: searchQuery,
            path: ["name", "description", "category"],
          },
        },
      });
    }

    pipeline.push(
      {
        $match: {
          itemInStock: true,
          ...(category ? { category: category } : {}),
        },
      },
      {
        $skip: (pageIndex - 1) * pageSize,
      },
      {
        $limit: pageSize,
      }
    );

    const productList = await Product.aggregate(pipeline);

    return res
      .status(200)
      .json({ message: "Product Sent Successfully !", productList });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to send data !!" });
  }
});

router.get("/best-selling-products", async (req, res) => {
  try {
    const bestSellingProducts = await Orders.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products._id",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(bestSellingProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch products !" });
  }
});

router.get("/recommendations", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const recommendations = await Product.aggregate([
      { $match: { itemInStock: true } },
      { $sample: { size: limit } },
    ]);

    res.status(200).json(recommendations);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch temporary recommendations",
        error: error.message,
      });
  }
});

export default router;

const updateInventoryMetrics = async (sellerId, quantity, price) => {
  try {
    let inventory = await Inventory.findOne({ sellerId });
    if (!inventory)
      inventory = new Inventory({
        sellerId: sellerId,
        totalItems: 0,
        lowStockItems: 0,
        outOfStockItems: false,
        inventoryValue: 0,
      });

    inventory.totalItems += parseInt(quantity);
    inventory.inventoryValue += parseInt(quantity) * parseInt(price);
    if (inventory.totalItems < 10) inventory.lowStockItems++;

    await inventory.save();
    return { success: true };
  } catch (error) {
    console.log(error, " Inventory Update Failed !!");
    return { success: false, error: error.message };
  }
};
