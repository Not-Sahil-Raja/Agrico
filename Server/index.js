import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import express from "express";
import cors from "cors";

import dashboard from "./src/routes/dashboard.route.js";
import LessonPost from "./src/routes/lessonPost.route.js";
import Seller from "./src/routes/seller.route.js";
import Product from "./src/routes/product.route.js";
import Order from "./src/routes/order.route.js";
import Feedback from "./src/routes/feedback.route.js";

import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

dotenv.config({
  path: "../env",
});

const app = express();

app.use(cors({}));
app.use(express.json());

// * Using Clerk for Authorization
app.use(ClerkExpressRequireAuth());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthorized access!");
});

// * Add all the api routes

app.use("/api/seller-dashboard", dashboard);
app.use("/api/lesson/", LessonPost);
app.use("/api/seller/", Seller);
app.use("/api/product/", Product);
app.use("/api/orders/", Order);
app.use("/api/feedback/", Feedback);

app.get("/", ClerkExpressWithAuth(), (req, res) => {
  res.send("Welcome to the Agrico API!");
  console.log("Root URL accessed !");
});

// *  Connecting DB and  Server running on port message

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error : ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection failed ! ", err);
  });
