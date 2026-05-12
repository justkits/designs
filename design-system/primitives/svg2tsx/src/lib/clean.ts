import { mkdir, rm } from "node:fs/promises";
import { relative, resolve } from "node:path";

export async function clean(dir: string): Promise<void> {
  const resolvedDir = resolve(dir);
  const cwd = process.cwd();
  const rel = relative(cwd, resolvedDir);

  // outDir must be a strict subdirectory of cwd (not cwd itself, not outside it)
  if (!rel || rel.startsWith("..")) {
    throw new Error(
      `Refusing to clean "${resolvedDir}": outDir must be a subdirectory of the current working directory ("${cwd}").`,
    );
  }

  try {
    await rm(resolvedDir, { recursive: true, force: true });
    await mkdir(resolvedDir, { recursive: true });
  } catch (error) {
    throw new Error(
      `Error cleaning directory "${dir}": ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
