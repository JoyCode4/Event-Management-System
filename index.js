import express from "express";
import session from "express-session";
import "./config/mongoose.js";
import { router } from "./routes/index.js";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 60 * 24 },
  })
);
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
