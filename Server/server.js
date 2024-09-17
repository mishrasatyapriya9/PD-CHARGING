//create server in express
import express from "express";
// const express = require('express'); it is used in 'ES5'
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import morgan from "morgan";
//DOTENV USED TO SECURE THE DETAILS
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import pdDevicesRoute from "./routes/pdDevicesRoute.js";
import cors from "cors";
import userModel from "../Server/models/userModel.js";
import devicesModel from "./models/Device.js";

dotenv.config();

//databse config
connectDB();
const app = express();
//middleware
app.use(cors());

app.use(express.json());
//now we can send json data in req and res
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/devices", pdDevicesRoute);
//put this in the postman during the get and post methods like {http://localhost:3000/api/v1/auth/register}

//rest api
app.get("/", (req, res) => {
  res.send("<h1>hii welcome to PD_charging_Device_Checking webapp</h1>");
});

app.post("/register", async (req, res) => {
  try {
    //getting data from body
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    //check User
    const existingUser = await userModel.findOne({ email });
    //checking for previously existing users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //registering new User to our website
    //changing password to hashed password for more security with AUTHCONTROLLER
    // const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(
    `Server  is running in ${process.env.DEV_MODE} MODE IN port no ${PORT}`
      .bgCyan.black
  );
});
