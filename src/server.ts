import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {
  deleteCredential,
  readCredentials,
  writeCredentials,
  readCredential,
} from "./utils/credentials";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env MONGO_URL");
}
const app = express();
const port = 5000;

app.use((_request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/credentials", async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.post("/api/credentials", async (request, response) => {
  await writeCredentials(request.body);

  response.json(request.body);
});
app.delete("/api/credentials/:service", async (request, response) => {
  await deleteCredential(request.params.service);
  response.send(`"Deleted" ${request.params.service}`);
});

connectDatabase(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`mysterybox listening at http://localhost:${port}`);
  });
});
app.get("/api/credentials", async (request, response) => {
  const credential = await readCredential(request.params.service);
  response.json(credential);
});
