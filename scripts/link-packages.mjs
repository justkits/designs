#!/usr/bin/env node
/**
 * Links all public packages in this monorepo to the GitHub repository so they
 * appear in the repository's "Packages" section on the right panel.
 *
 * Prerequisites: `gh` CLI installed and authenticated (`gh auth login`).
 *
 * Usage:
 *   pnpm link-packages
 */

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");

/**
 * Run a GraphQL query via the `gh` CLI.
 * Passes variables as separate -f flags to avoid string interpolation in queries.
 *
 * @param {string} query - GraphQL query/mutation string (may include $var references)
 * @param {Record<string, string>} [vars] - Variables to pass to the query
 */
function gh(query, vars = {}) {
  const args = ["api", "graphql", "-f", `query=${query}`];
  for (const [key, value] of Object.entries(vars)) {
    args.push("-f", `${key}=${value}`);
  }
  const result = execFileSync("gh", args, { encoding: "utf-8" });
  return JSON.parse(result);
}

// Resolve owner/repo from the git remote URL
const remoteUrl = execFileSync(
  "git",
  ["remote", "get-url", "origin"],
  { encoding: "utf-8", cwd: root },
).trim();
const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+?)(?:\.git)?$/);
if (!match) {
  console.error("Could not parse GitHub owner/repo from remote URL:", remoteUrl);
  process.exit(1);
}
const [, owner, repo] = match;

console.log(`Linking packages to ${owner}/${repo}...\n`);

// Get the repository's GraphQL node ID
const repoData = gh(
  `query GetRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) { id }
  }`,
  { owner, name: repo },
);
const repoId = repoData.data.repository.id;

// Discover public packages from packages/*/package.json
const packagesDir = join(root, "packages");
const publicPackages = readdirSync(packagesDir)
  .map((dir) => {
    try {
      return JSON.parse(
        readFileSync(join(packagesDir, dir, "package.json"), "utf-8"),
      );
    } catch {
      return null;
    }
  })
  .filter((pkg) => pkg && pkg.name && !pkg.private)
  .map((pkg) => pkg.name);

if (publicPackages.length === 0) {
  console.log("No public packages found.");
  process.exit(0);
}

console.log(
  `Found ${publicPackages.length} public package(s): ${publicPackages.join(", ")}\n`,
);

let linked = 0;
let failed = 0;

for (const pkgName of publicPackages) {
  process.stdout.write(`Processing ${pkgName}... `);

  const pkgData = gh(
    `query GetPackage($login: String!, $name: String!) {
      repositoryOwner(login: $login) {
        ... on Organization {
          packages(packageType: NPM, names: [$name], first: 1) { nodes { id } }
        }
        ... on User {
          packages(packageType: NPM, names: [$name], first: 1) { nodes { id } }
        }
      }
    }`,
    { login: owner, name: pkgName },
  );
  const pkgId = pkgData.data.repositoryOwner?.packages?.nodes?.[0]?.id;

  if (!pkgId) {
    console.log(`✗ not found in GitHub Packages (has it been published yet?)`);
    failed++;
    continue;
  }

  try {
    gh(
      `mutation Link($packageId: ID!, $repositoryId: ID!) {
        linkRepositoryToPackage(input: { packageId: $packageId, repositoryId: $repositoryId }) {
          package { name }
        }
      }`,
      { packageId: pkgId, repositoryId: repoId },
    );
    console.log(`✓ linked`);
    linked++;
  } catch (err) {
    console.log(`✗ failed (${err.message.split("\n")[0]})`);
    failed++;
  }
}

console.log(`\nDone: ${linked} linked, ${failed} failed.`);
