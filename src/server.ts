import fs from "fs";

console.log(fs.readFileSync("./README.md", "utf-8"));
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your height?`, (name: string) => {
  console.log(`OH ${name}!`);
});
readline.question(`What's your length?`, (name: string) => {
  console.log(`OH ${name}!`);
  readline.close();
});
