import inquirer from "inquirer";
import { Command } from "../types";

// export async function askForMainPassword(): Promise<string> {
export const askForMainPassword = async (): Promise<string> => {
  const answers = await inquirer.prompt<{ mainPassword: string }>([
    {
      type: "password",
      name: "mainPassword",
      message: "Enter main password （⊙ｏ⊙)",
    },
  ]);
  return answers.mainPassword;
};
export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: "list",
    name: "command",
    message: "what do you want to do?",
    choices: [
      { name: "List all credentials", value: "list" },
      { name: " Add new credential", value: "add" },
    ],
  });
  return answers.command;
};
