// import fs from "fs";

// console.log(fs.readFileSync("./README.md", "utf-8"));
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`What's your height?`, (name: string) => {
//   console.log(`OH ${name}!`);
// });
// readline.question(`What's your length?`, (name: string) => {
//   console.log(`OH ${name}!`);
//   readline.close();
// });

import { printPassword } from "./utils/messages";
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
  chooseService,
} from "./utils/question";
import { isMainPasswordValid } from "./utils/validation";

const start = async () => {
  const mainPassword = await askForMainPassword();
  if (!isMainPasswordValid(mainPassword)) {
    console.log("is Invalid");
    start();
  } else {
    console.log("is Valid");
  }
  const command = await chooseCommand();

  switch (command) {
    case "list":
      {
        const service = await chooseService(["Github", "Codewars", "Google"]);
        printPassword(service);
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
