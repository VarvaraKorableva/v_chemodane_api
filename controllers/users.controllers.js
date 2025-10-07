import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

import {
  _createUser,
  _getAllUsers,
  _setSubscription

} from "../models/users.models.js"

const {JWT_SECRET} = process.env;

export const createUser = async (req, res) => {
  const { username, email, password, subscribed, phone } = req.body;
  try {
    const data = await _createUser(username, email, password, subscribed, phone);
    const token = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '7d' });
    const user = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      subscribed: data.subscribed,
      phone: data.phone
    };
    return res
      .cookie('jwt', token, { httpOnly: true, sameSite: true })
      .json({ token, user });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.message === "Email is already registered") {
      return res.status(400).json({ msg: "Email is already registered" });
    }
    return res.status(500).json({ msg: "Error, you are not registered, try again" });
  }
};

export const getAllUsers = (req, res) => {
    _getAllUsers()
      .then((data) => res.json(data))
      .catch((err) => {
        console.error(err);
        res.status(404).json({ msg: "Not Found" });
      });
  };


export const setSubscription = async (req, res) => {
    const { userId } = req.params;
    const { subscribed } = req.body; // ожидаем { "subscribed": true } или false
  
    try {
      const user = await _setSubscription(userId, subscribed);
      res.json({ msg: "Статус подписки обновлён ✅", user });
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
};