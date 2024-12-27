import express from "express";
import { Product } from "../models/products.model.js";
import { Orders } from "../models/orders.model.js";
import { sellerDetail } from "../models/sellerdetails.model.js";
import { Inventory } from "../models/inventorydetails.model.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  const sellerEmail = req.query.sellerEmail;

  if (!sellerEmail)
    return res
      .status(400)
      .json({ message: "Required fields are not filled !" });

  const seller = await sellerDetail.findOne({ email: sellerEmail });
  if (!seller) return res.status(404).json({ message: "Seller not found !" });
  const sellerId = seller._id;

  try {
    const totalSales = await Product.find({ sellerId: sellerId });
    const totalOrder = await Orders.countDocuments({
      "products._id": { $in: totalSales.map((product) => product._id) },
    });
    const totalCustomers = await Orders.distinct("userId", {
      "products._id": { $in: totalSales.map((product) => product._id) },
    }).countDocuments();
    const salesAreas = await Orders.distinct("shippingDetail.City", {
      "products._id": { $in: totalSales.map((product) => product._id) },
    });

    // Sales report aggregation
    const salesReport = await Orders.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          totalSales: { $sum: "$total" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const formattedReport = salesReport.map((report) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      return {
        month: monthNames[report._id.month - 1],
        totalSales: report.totalSales,
        totalOrders: report.totalOrders,
      };
    });

    res.status(200).json({
      totalSales: totalSales.length,
      totalOrder: totalOrder,
      totalCustomers: totalCustomers,
      salesAreas: salesAreas.length,
      formattedReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send  overview data" });
  }
});

router.get("/sales", async (req, res) => {
  const sellerEmail = req.query.sellerEmail;

  if (!sellerEmail)
    return res
      .status(400)
      .json({ message: "Required fields are not filled !" });

  const seller = await sellerDetail.findOne({ email: sellerEmail });
  if (!seller) return res.status(404).json({ message: "Seller not found !" });
  const sellerId = seller._id;

  try {
    const totalSales = await Product.find({ sellerId: sellerId });

    const topSoldItems = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: totalSales.map((product) => product._id) },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products._id",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$productDetails.name",
          image: "$productDetails.image",
          totalQuantity: 1,
        },
      },
    ]);

    const totalRevenue = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: totalSales.map((product) => product._id) },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const returningCustomers = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: totalSales.map((product) => product._id) },
        },
      },
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $count: "returningCustomers" },
    ]);

    const totalOrder = await Orders.countDocuments({
      "products._id": { $in: totalSales.map((product) => product._id) },
    });

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklySalesSummary = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: totalSales.map((product) => product._id) },
          date: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$date" },
          totalSales: { $sum: "$total" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const salesSummary = Array(7).fill({ totalSales: 0, totalOrders: 0 });
    weeklySalesSummary.forEach((day) => {
      salesSummary[day._id - 1] = {
        totalSales: day.totalSales,
        totalOrders: day.totalOrders,
      };
    });

    const averageOrderValue = totalRevenue[0]
      ? totalRevenue[0].total / totalOrder
      : 0;
    const totalRevenueValue = totalRevenue[0] ? totalRevenue[0].total : 0;

    res.status(200).json({
      totalRevenue: totalRevenueValue,
      returningCustomers: returningCustomers[0]
        ? returningCustomers[0].returningCustomers
        : 0,
      averageOrderValue: averageOrderValue,
      topSoldItems,
      weeklySalesSummary,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to send sales data !!" });
  }
});

router.get("/orders", async (req, res) => {
  const sellerEmail = req.query.sellerEmail;

  if (!sellerEmail)
    return res
      .status(400)
      .json({ message: "Required fields are not filled !" });

  const seller = await sellerDetail.findOne({ email: sellerEmail });
  if (!seller) return res.status(404).json({ message: "Seller not found !" });
  const sellerId = seller._id;

  try {
    const SellerProducts = await Product.find({ sellerId: sellerId });
    const totalOrders = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: SellerProducts.map((product) => product._id) },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    const PendingOrders = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: SellerProducts.map((product) => product._id) },
          status: "processing",
        },
      },
      {
        $unwind: "$products",
      },
    ]);

    const CompletedOrders = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: SellerProducts.map((product) => product._id) },
          status: "completed",
        },
      },
      {
        $unwind: "$products",
      },
    ]);

    const totalRevenue = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: SellerProducts.map((product) => product._id) },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenueValue = totalRevenue[0] ? totalRevenue[0].total : 0;

    const RecentOrders = await Orders.aggregate([
      {
        $match: {
          "products._id": { $in: SellerProducts.map((product) => product._id) },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      TotalOrders: totalOrders ? totalOrders[0].count : 0,
      PendingOrders: PendingOrders.length,
      CompletedOrders: CompletedOrders.length,
      AverageOrderValue:
        totalRevenueValue / (totalOrders ? totalOrders[0].count : 1),
      RecentOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to send order data !" });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const sellerEmail = req.query.sellerEmail;

    if (!sellerEmail)
      return res
        .status(400)
        .json({ message: "Required fields are not filled !" });

    const seller = await sellerDetail.findOne({ email: sellerEmail });
    if (!seller) return res.status(404).json({ message: "Seller not found !" });
    const sellerId = seller._id;
    const InventoryDetails = await Inventory.findOne({ sellerId: sellerId });
    const currentInventory = await Product.find({
      sellerId: sellerId,
      itemInStock: true,
    });
    res.status(200).json({ InventoryDetails, currentInventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to send inventory data !" });
  }
});

export default router;
