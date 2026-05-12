#!/usr/bin/env node

declare const __PKG_VERSION__: string;

import { Command } from "commander";

import { generate } from "./generate";

const program = new Command();

program
  .name("svg2tsx")
  .description("JustKits SVG2TSX CLI to generate React components from SVGs")
  .version(__PKG_VERSION__)
  .option("-c, --config <path>", "path to config file")
  .option("--dry-run", "preview changes without writing any files")
  .action(() => generate(program.opts()));

program.parse();
