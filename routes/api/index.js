import express from "express";
import { usersRouter } from "./users.js";
import { eventsRouter } from "./events.js";
import { ticketsRouter } from "./tickets.js";
import { commentsRouter } from "./comments.js";

export const apiRouter = express.Router();
apiRouter.get("/", (req, res) => {
  res.json({
    message: "It is the API route",
  });
});

apiRouter.use("/events", eventsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/tickets", ticketsRouter);
apiRouter.use("/comments", commentsRouter);
