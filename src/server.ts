import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env MONGO_URL");
}
const app = express();
const port = 5000;

app.get("/api/credentials", (_request, response) => {
  response.send("All credentials requested");
});

app.post("/api/credentials", (_request, response) => {
  response.send("Add new credential");
});

connectDatabase(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`mysterybox listening at http://localhost:${port}`);
  });
});
