import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { users_router } from "./routes/users.routes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  credentials: true,
  origin: [
    '*',
    'http://localhost:3000',
    'https://localhost:3000',
    'https://vchemodane.com/',
    'http://vchemodane.com/',
  ],
}));

app.use("/users", users_router);


app.listen(process.env.PORT || 8080, () => {
  console.log(`run on ${process.env.PORT || 8080}`);
});