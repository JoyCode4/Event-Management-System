import express from "express";

export const ticketsRouter = express.Router();

ticketsRouter.get("/", (req, res) => {
  res.json({
    message: "Ticket API",
  });
});
