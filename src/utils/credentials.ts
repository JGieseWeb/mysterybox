// import fs from "fs/promises";
import CryptoJS from "crypto-js";
import type { Credential } from "../types";
import { getCredentialsCollection } from "./database";
import { chooseService } from "./question";

// type DB = {
//   credentials: Credential[];
// };

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();

  // const response = await fs.readFile("./db.json", "utf-8");
  // const data: DB = JSON.parse(response);
  // return data.credentials;
};
export const selectCredential = async (): Promise<Credential> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );
  const service = await chooseService(credentialServices);
  const selectedCredential = credentials.find(
    (credential) => credential.service === service
  );
  if (!selectedCredential) {
    throw new Error("Can not find credential");
  }
  return selectedCredential;
};

export const deleteCredential = async (service: string): Promise<boolean> => {
  const result = await getCredentialsCollection().deleteOne({
    service: service,
  });
  if (result.deletedCount === undefined) {
    return false;
  }
  return result.deletedCount > 0;
};

export const writeCredentials = async (
  credential: Credential
): Promise<void> => {
  credential.password = CryptoJS.AES.encrypt(
    credential.password,
    "passwordHash"
  ).toString();
  await getCredentialsCollection().insertOne(credential);
};
