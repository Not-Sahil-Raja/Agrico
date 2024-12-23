import express from "express";
import bcrypt from "bcrypt";
import streamifier from "streamifier";
import upload from "../middlewares/multer.middleware.js";
import { sellerDetail } from "../models/sellerdetails.model.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post("/register", upload.single("profilePic"), async (req, res) => {
  const { firstName, lastName, email, password, displayName, bio } = req.body;

  const findUser = await sellerDetail.findOne({ email: email });

  if (findUser)
    return res
      .status(409)
      .json({ message: "User Already Exists !! Try Login" });

  const file = req.file;
  if (!file)
    return res.status(401).json({ message: "Required Fields Are Missing" });
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "demo" },
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

  if (!result || !result.secure_url)
    return res.status(500).json({ message: "failed to upload profile pic" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSeller = new sellerDetail({
      name: firstName + " " + lastName,
      email,
      password: hashedPassword,
      displayName,
      bio,
      profilePic: result.secure_url,
    });
    const savedSellerDetails = await newSeller.save();

    res.status(201).json(savedSellerDetails);
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Required Fields are not filled !!" });

  const seller = await sellerDetail.findOne({ email: email });
  if (!seller) return res.status(404).json({ message: "Seller not found" });

  //comparing the given password and database's password
  const isMatch = await bcrypt.compare(password, seller.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful", seller });
});

router.put("/update-profile", upload.single("profilePic"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Profile picture is required" });
  }
  const { email, currentPassword, updatedData } = req.body;
  const parsedData = JSON.parse(updatedData);
  try {
    const findSeller = await sellerDetail.findOne({ email: email });
    if (!findSeller) res.status(404).json({ message: "Seller Not Found" });

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      findSeller.password
    );

    if (!passwordMatch)
      return res.status(400).json({ message: "Incorrect password !!" });

    let newProfilePic;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "demo" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      if (!result || !result.secure_url)
        return res
          .status(500)
          .json({ message: "Failed to upload new profile pic" });

      newProfilePic = result.secure_url;
    }

    const updatedSeller = await sellerDetail.findOneAndUpdate(
      { email: email },
      {
        name:
          parsedData.firstName + " " + parsedData.lastName || findSeller.name,
        displayName: parsedData.displayName || findSeller.displayName,
        bio: parsedData.bio || findSeller.bio,
        profilePic: newProfilePic || findSeller.profilePic,
      },
      { new: true }
    );

    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
});

router.put("/update-password", async (req, res) => {
  const { email, currentPassword, newPasssword } = req.body;

  //checking the seller in the database
  const findSeller = await sellerDetail.findOne({ email: email });

  if (!findSeller)
    return res.status(404).json({ message: "Can't Find The Seller !!" });

  //checking the current password
  const passwordMatch = await bcrypt.compare(
    currentPassword,
    findSeller.password
  );

  if (!passwordMatch)
    return res.status(400).json({ message: "Incorrect Password !!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPasssword, salt);

  //setting the new password
  findSeller.password = hashedPassword;
  await findSeller.save();

  res.status(200).json({ message: "Password updated successfully !!" });
});

export default router;
