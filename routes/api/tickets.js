import express from "express";
import { create } from "../../controller/ticketsController.js";
import { auth } from "../../middleware/jwtauth.js";
export const ticketsRouter = express.Router();

ticketsRouter.post("/create/:event", auth, create);
