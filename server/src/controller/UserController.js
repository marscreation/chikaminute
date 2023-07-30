import UserModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    let users;
    if (searchQuery) {
      // get users within the query
      users = await UserModel.find({
        $or: [
          { firstname: { $regex: searchQuery, $options: "i" } },
          { lastname: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
          { username: { $regex: searchQuery, $options: "i" } },
        ],
      });
    } else {
      //get all users if no query
      users = await UserModel.find();
      users = users.map((user) => {
        const { password, ...otherDetails } = user._doc;
        return otherDetails;
      });
      res.status(200).json(users);
    }

    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
  // try {
  //   let users = await UserModel.find();
  // users = users.map((user) => {
  //   const { password, ...otherDetails } = user._doc;
  //   return otherDetails;
  // });
  // res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
};

// udpate a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password, username, email } = req.body;
  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      //added email/username validation when updating a profile
      const oldUser = await UserModel.findOne({ username });

      if (oldUser)
        return res.status(400).json({ message: "User already exists" });

      const emailExist = await UserModel.findOne({ email });

      if (emailExist) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // have to change this
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      console.log({ user, token });
      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId == id) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};
