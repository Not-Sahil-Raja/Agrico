import express from "express";
import { User } from "../models/users.model.js";

const router = express.Router();

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/postallusers", async (req, res) => {
  try {
    if (
      (!req.body.username, !req.body.email, !req.body.phno, !req.body.password)
    ) {
      return res.status(400).send("All fields required");
    }

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      phno: req.body.phno,
      password: req.body.password,
    };

    const userAdded = await User.create(newUser);

    return res.status(201).send(userAdded);
  } catch (error) {
    console.log("Unable to push to DB", error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/getuser/:email", async (req, res) => {
  try {
    const thismail = req.params.email;
    const foundmail = await User.findOne({ email: thismail });
    return res.status(200).json(foundmail);
  } catch (e) {
    console.log("Did not receive username : ", e.message);
  }
});

router.get("/checkmail/:email", async (req, res) => {
  try {
    const chkmail = req.params.email;
    const foundchkmail = await User.findOne({ email: chkmail });
    return res.status(200).json(foundchkmail);
  } catch (e) {
    console.log("Error in email check : ", e.message);
  }
});
export default router;
