import dotenv from "dotenv";
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
} from "./utils/question";
import { isMainPasswordValid } from "./utils/validation";
import {
  deleteCredential,
  selectCredential,
  writeCredentials,
} from "./utils/credentials";
import { connectDatabase, disconnectDatabase } from "./utils/database";
import CryptoJS from "crypto-js";

dotenv.config();

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error("Missing env MONGO_URL");
  }
  await connectDatabase(process.env.MONGO_URL);
  const mainPassword = await askForMainPassword();
  if (!(await isMainPasswordValid(mainPassword))) {
    console.log("is Invalid");
    start();
  } else {
    console.log("is Valid");
  }
  const command = await chooseCommand();

  switch (command) {
    case "list":
    case "delete":
      {
        const selectedCredential = await selectCredential();
        if (command === "list") {
          if (selectedCredential) {
            selectedCredential.password = CryptoJS.AES.decrypt(
              selectedCredential.password,
              "passwordHash"
            ).toString(CryptoJS.enc.Utf8);

            console.log(selectedCredential);
          }
        } else {
          const deleted = await deleteCredential(selectedCredential.service);
          if (deleted) {
            console.log("Deleted");
          } else {
            console.log("Not deleted");
          }
        }
      }
      break;

    case "add":
      {
        const Credential = await askForCredential();
        await writeCredentials(Credential);
        console.log(Credential);
      }
      break;
  }
  await disconnectDatabase();
};
start();
// export async function selectCredential: () {
//   const credentials = await readCredentials();
//   const credentialServices = credentials.map(
//     (credential) => credential.service
//   );
//   const service = await chooseService(credentialServices);
//   const selectedService = credentials.find(
//     (credential) => credential.service === service
//   );
//   if (selectedService) {
//     selectedService.password = CryptoJS.AES.decrypt(
//       selectedService.password,
//       "passwordHash"
//     ).toString(CryptoJS.enc.Utf8);

// return selectedService;
// }
