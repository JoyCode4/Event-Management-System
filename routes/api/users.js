import express from "express";

export const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.json({
    message: "User API",
  });
});
