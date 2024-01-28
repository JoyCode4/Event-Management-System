import express from "express";
import { auth } from "../../middleware/jwtauth.js";
import { create } from "../../controller/commentsController.js";
export const commentsRouter = express.Router();

commentsRouter.post("/create/:event", auth, create);
