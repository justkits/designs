import chalk from "chalk";

function info(message: string): void {
  console.log(chalk.cyan(message));
}

function error(message: string): void {
  console.error("❌", chalk.red(message));
}

function success(message: string): void {
  console.log("✅", chalk.green(message));
}

export const logger = {
  info,
  error,
  success,
};
