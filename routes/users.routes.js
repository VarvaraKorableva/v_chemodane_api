import express from "express";
const users_router = express.Router();
import {
    createUser,
    getAllUsers,
    setSubscription
} from "../controllers/users.controllers.js";

users_router.post('/signup', createUser)
users_router.get('/all', getAllUsers)
users_router.patch("/:userId/subscription", setSubscription)

export { users_router };