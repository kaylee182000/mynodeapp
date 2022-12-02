import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

//Register User
export const register = async (req, res) => {
  try {
    //destucturing params from the request.body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //use salt to encrypt pwd
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.statu(500).json({ error: err.message });
  }
};
