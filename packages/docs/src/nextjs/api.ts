import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { DocsNode } from "../types";

export function getSidebarItems(page: string): DocsNode[] {
  const outputDir = ".next";
  const path = join(process.cwd(), outputDir, "justkitsdocs-manifest.json");
  const manifest: Record<string, DocsNode[]> = JSON.parse(
    readFileSync(path, "utf-8"),
  );
  return manifest[page] ?? [];
}
