import express from "express";
import "./config/mongoose.js";
const app = express();
const PORT = 8080;
app.get("/", (req, res) => {
  res.send("Welcome to Event Management System");
});

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
