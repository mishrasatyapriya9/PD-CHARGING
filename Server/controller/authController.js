import userModel from "../models/userModel.js";
import hashPassword from "../helpers/authHelper.js";
import comparePassword from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
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
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
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
};
// export default {registerController}

//for Login
export const loginController = async (req, res) => {
  try {
    //getting data from body
    const { email, password } = await req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user that user registerd or not ,we have to get the hased password from user database
    //hassedpassword = user.password
    //check the user on the basis of user registerd email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid email",
        error,
      });
    }
    //check the matching of password and hashedpassword
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "invalid password",
        error,
      });
    }
    //create token for that user
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfull",
      //sending some user detils like phone with a user OBJECT
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Login",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  res.send("protected route");
};
