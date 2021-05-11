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

import { askForMainPassword, chooseCommand } from "./utils/question";
import { isMainPasswordValid } from "./utils/validation";

const start = async () => {
  const mainPassword = await askForMainPassword();
  if (!isMainPasswordValid(mainPassword)) {
    console.log("is Invalid");
    start();
  } else {
    console.log("is Valid");
  }
};
start();

const command = await chooseCommand();

switch (command) {
  case "list":
    console.log("List Case");
    break;
  case "add":
    console.log("Add Case");
    break;
}
