import express from "express";
import "./config/mongoose.js";
import { router } from "./routes/index.js";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
