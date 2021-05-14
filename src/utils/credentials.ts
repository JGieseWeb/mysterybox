import fs from "fs/promises";
import type { Credential } from "../types";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(response);
  return data.credentials;
};
export const writeCredentials = async (
  newCredential: Credential
): Promise<void> => {
  const allCredentials = await readCredentials();
  allCredentials.push(newCredential);
  const dbJSON = JSON.stringify({ credentials: allCredentials }, null, 2);
  await fs.writeFile("./db.json", dbJSON);
};
