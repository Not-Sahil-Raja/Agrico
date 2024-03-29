import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import express from "express";
import cors from "cors";
import users from "./src/routes/users.route.js";
import items from "./src/routes/items.route.js";
import courses from "./src/routes/courses.route.js";

dotenv.config({
  path: "./env",
});

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/", users);
app.use("/", items);
app.use("/", courses);

console.log(`var : , ${process.env.NEWA}`);
app.get("/", (req, res) => {
  res.send("LOL");
  console.log("listening on port 8000");
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error at : ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection failed ! ", err);
  });
