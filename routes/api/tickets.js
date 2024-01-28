import express from "express";
import {
  purchaseTicket,
  getTickets,
} from "../../controller/ticketsController.js";
import { auth } from "../../middleware/jwtauth.js";
export const ticketsRouter = express.Router();

ticketsRouter.post("/purchase/:event", auth, purchaseTicket);
ticketsRouter.get("/", auth, getTickets);
