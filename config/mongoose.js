import mongoose from "mongoose";

main().catch((err) => console.log("Database Connection Error : " + err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/events");
  console.log("Database Connection Established using mongoose MongoDB");
}
