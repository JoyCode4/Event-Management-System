import express from "express";
import { signUp, signIn } from "../../controller/usersController.js";
export const usersRouter = express.Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/signin", signIn);
