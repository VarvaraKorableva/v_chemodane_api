import express from "express";
const users_router = express.Router();
import {
    createUser,
    getAllUsers,
    unsubscribeUser
} from "../controllers/users.controllers.js";

users_router.post('/signup', createUser)
users_router.get('/all', getAllUsers)
users_router.patch("/unsubscribeUser", unsubscribeUser)

export { users_router };