import * as fg from "fast-glob";

import { generate } from "@/generate";
import { logger } from "@/lib/logger";
import { prepareConfig, setup } from "../setup";

describe("corner cases - invalid directory structure", () => {
  setup();

  it("should exit program when handling empty directory", async () => {
    vi.spyOn(fg, "default").mockResolvedValue([]);

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("No SVG files found in the source directory."),
    );
  });

  it("should exit program if invalid directory structure is provided", async () => {
    // family와 flat 구조가 혼용되어 있는 경우
    vi.spyOn(fg, "default").mockResolvedValue(["icons/icon1.svg", "icon2.svg"]);

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      "Error: Mixed directory structure detected: some SVG files are in subfolders (family) and some are not (flat). Please organize all SVGs into subfolders or keep them all at the root level.",
    );
  });

  it("should exit program if invalid directory structure is provided 2", async () => {
    // 아예 잘못된 경우
    vi.spyOn(fg, "default").mockResolvedValue([
      "./src/icons/subdirectory/icon1.svg",
    ]);

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      'Error: Invalid file path: "./src/icons/subdirectory/icon1.svg". Please move the file to the correct location.',
    );
  });

  it("should exit program if srcDir is not a subdirectory of cwd", async () => {
    prepareConfig({ srcDir: "../assets" });
    await expect(generate({ dryRun: false })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error: Invalid srcDir:"),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "srcDir must be a subdirectory of the current working directory",
      ),
    );
  });

  it("should exit program if outDir is not a subdirectory of cwd", async () => {
    prepareConfig({ outDir: "../icons" });
    await expect(generate({ dryRun: false })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error: Refusing to clean"),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "outDir must be a subdirectory of the current working directory",
      ),
    );
  });
});
