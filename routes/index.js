import express from "express";
import { apiRouter } from "./api/index.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Event Management System");
});

router.use("/api", apiRouter);
