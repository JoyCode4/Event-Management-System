import express from "express";

export const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
  res.json({
    message: "Event API",
  });
});
