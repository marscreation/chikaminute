import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username }).select(
      'name email password'
    );

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json({ message: 'Invalid password' });
      } else {
        const { _id, name, email } = user._doc;
        const token = jwt.sign({ id: _id, name, email }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ user: { id: _id, name, email }, token });
      }
    } else {
      res.status(404).json('User not found');
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
      return res.status(400).json({ message: 'User already exists' });

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
