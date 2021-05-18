import dotenv from "dotenv";
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
  chooseService,
} from "./utils/question";
import { isMainPasswordValid } from "./utils/validation";
import { readCredentials, writeCredentials } from "./utils/credentials";
import { connectDatabase, disconnectDatabase } from "./utils/database";

dotenv.config();
console.log(process.env.MONGO_URL);

// const databaseURI = "mongodb+srv://mysterybox:<6AM352cNw6j6hClo>@clusterfree.8x4pd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
      {
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.service
        );
        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.service === service
        );
        console.log(selectedService);
        // printPassword(service);
      }
      break;
    case "add":
      {
        const newCredential = await askForCredential();
        await writeCredentials(newCredential);
        console.log(newCredential);
      }
      break;
  }
  await disconnectDatabase();
};
start();
