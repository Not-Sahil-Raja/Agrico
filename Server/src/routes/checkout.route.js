import express from "express";
import { Item } from "../models/marketPlaceItems.model.js";
import { SoldItem } from "../models/soldItem.model.js";

const router = express.Router();

router.post("/checkout", async (req, res) => {
  try {
    const item = req.body;
    const newItem = await SoldItem.insertMany(item);
    item.map(async (item) => {
      await Item.findByIdAndDelete(item._id)
        .then((item) => {
          console.log("Item deleted from marketPlace:", item);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    res.status(201).send("Item added to sold items");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
