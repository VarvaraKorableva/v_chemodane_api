import { db } from "../db.js"
import bcrypt from 'bcrypt'

export const _createUser = async (username, email, password, subscribed, phone, ) => {
    try {
      const existingUser = await db("users").where({ email }).first();
        if (existingUser) {
          throw new Error("Email is already registered");
        } else {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        const result = await db("users").insert({
          username,
          email,
          password: hashedPassword,
          subscribed,
          phone
        }).returning("*");
  
        return result[0];
      }} 
      catch (error) {
        throw new Error(`${error.message}`);
      } 
};

export const _getAllUsers = () => {
    return db("users")
      .select("id", "username", "email", "phone", "subscribed", "created_at")
      .orderBy("id");
  };

  export const _unsubscribeUserByEmail = async (email) => {
    try {
      const result = await db("users")
        .where({ email })
        .update({ subscribed: false })
        .returning(["id", "username", "email", "subscribed"]);
  
      if (!result.length) {
        throw new Error("Пользователь не найден");
      }
  
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };