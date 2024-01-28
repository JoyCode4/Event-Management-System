import jwt from "jsonwebtoken";
const secret = "secret";
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  try {
    const payload = jwt.verify(token, secret);
    console.log(payload);
    req.userId = payload.userId;
  } catch (e) {
    if (e) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
  }
  next();
};
