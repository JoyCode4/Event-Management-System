import express from "express";
import {
  create,
  allEvents,
  eventById,
} from "../../controller/eventsController.js";
import { auth } from "../../middleware/jwtauth.js";
export const eventsRouter = express.Router();

eventsRouter.post("/create", auth, create);
eventsRouter.get("/all_events", auth, allEvents);
eventsRouter.get("/:eventid", auth, eventById);
