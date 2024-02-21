import express from "express";
import { Item } from "../models/marketPlaceItems.model.js";

const router = express.Router();

router.post("/Allitems", async (req, res) => {
  try {
    if (
      !req.body.itemName ||
      !req.body.price ||
      !req.body.quantity ||
      !req.body.username
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    const items = {
      itemName: req.body.itemName,
      price: req.body.price,
      quantity: req.body.quantity,
      username: req.body.username,
    };
    const newItem = await Item.create(items);
    return res.status(201).send(newItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/itemsList", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/itemsList/:username", async (req, res) => {
  try {
    const items = await Item.find({ username: req.params.username });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
