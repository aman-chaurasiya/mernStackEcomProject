import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const testController = (req, res) => {
  try {
    res.send({
      success: true,
      message: "protected api",
    });
  } catch (error) {
    console.log(error);
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "newPassword is required",
      });
    }

    //check email and answer
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).sendI({
        success: false,
        message: "worng email or answer",
      });
    }
    const hash = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hash });
    res.status(200).send({
      success: true,
      messsage: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error,
    });
  }
};

//register  user || post
export const registerController = async (req, resp) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return resp.send({ message: "Name is Required!!  " });
    }
    if (!email) {
      return resp.send({ message: "email is Required!!  " });
    }
    if (!phone) {
      return resp.send({ message: "phone is Required!!  " });
    }
    if (!password) {
      return resp.send({ message: "password is Required!!  " });
    }
    if (!address) {
      return resp.send({ message: "address is Required!!  " });
    }
    if (!answer) {
      return resp.send({ message: "Answer is Required!!  " });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return resp.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    resp.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//Login || POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered ",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(403).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "error in login",
    });
  }
};
