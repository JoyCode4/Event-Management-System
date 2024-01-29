import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
const secret = "secret";

export const signUp = async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    if (password !== cpassword) {
      return res.send({
        error: "Password and Confirm Password should be same",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.send({
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      email: email,
      password: password,
    });

    return res.send({
      message: "user created successfully",
      user: newUser,
    });
  } catch (err) {
    return res.send({
      error: err,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({
        message: "User not exists",
      });
    }
    if (user.password !== password) {
      return res.send({
        message: "Invalid username or password",
      });
    }
    console.log(user);
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    return res.send({
      message: "Valid User",
      authToken: token,
    });
  } catch (err) {
    return res.send({
      error: err,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.send({
        message: "User not found",
      });
    }
    user.isDeleted = true;
    user.save();
    return res.send({
      message: "User deleted successfully",
      user: user,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
};
