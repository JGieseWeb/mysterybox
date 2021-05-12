// import { printPassword } from "./utils/messages";
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
  chooseService,
} from "./utils/question";
import { isMainPasswordValid } from "./utils/validation";
import { readCredentials } from "./utils/credentials";

const start = async () => {
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
        console.log(newCredential);
      }
      break;
  }
};
start();
