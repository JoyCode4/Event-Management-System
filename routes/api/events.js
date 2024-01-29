import express from "express";
import {
  create,
  allEvents,
  eventById,
  searchEventByLocation,
  searchEventByTitle,
  searchEventByDate,
  addRating,
  filterEvent,
} from "../../controller/eventsController.js";
import { auth } from "../../middleware/jwtauth.js";
export const eventsRouter = express.Router();

eventsRouter.post("/create", auth, create);
eventsRouter.get("/all_events", auth, allEvents);
eventsRouter.get("/filter", auth, filterEvent);
eventsRouter.get("/search/title", auth, searchEventByTitle);
eventsRouter.get("/search/date", auth, searchEventByDate);
eventsRouter.get("/search/location", auth, searchEventByLocation);
eventsRouter.post("/rate", auth, addRating);
eventsRouter.get("/:eventid", auth, eventById);
