import express from "express";
import { create } from "../../controller/eventsController.js";
import { auth } from "../../middleware/jwtauth.js";
export const eventsRouter = express.Router();

eventsRouter.post("/create", auth, create);
