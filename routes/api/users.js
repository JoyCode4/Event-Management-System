import express from "express";
import {
  signUp,
  signIn,
  deleteUser,
} from "../../controller/usersController.js";
export const usersRouter = express.Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/signin", signIn);
usersRouter.delete("/:userId", deleteUser);
