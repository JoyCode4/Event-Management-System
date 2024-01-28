import express from "express";

export const commentsRouter = express.Router();

commentsRouter.get("/", (req, res) => {
  res.json({
    message: "Comment API",
  });
});
