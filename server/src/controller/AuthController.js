import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username }).select(
      "firstname lastname email password"
    );

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json({ message: "Invalid password" });
      } else {
        const { _id, firstname, lastname, email } = user._doc;
        const token = jwt.sign(
          { id: _id, firstname, lastname, email },
          process.env.JWT_KEY,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        res
          .status(200)
          .json({ user: { id: _id, firstname, lastname, email }, token });
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username, email } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await newUser.save();
    // const token = jwt.sign(
    //   { username: user.username, id: user._id },
    //   process.env.JWT_KEY,
    //   { expiresIn: process.env.JWT_EXPIRES_IN }
    // );
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
