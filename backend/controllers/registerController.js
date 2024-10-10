import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const registerController = async (req, res) => {
  const { username, password, avatar } = req.body;
  console.log("username", username,password);
  try {
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({
      user
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
