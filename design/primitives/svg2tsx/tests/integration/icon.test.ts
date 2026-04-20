import * as fs from "node:fs/promises";
import * as fg from "fast-glob";

import { generate } from "@/generate";
import { logger } from "@/lib/logger";

describe("corner cases - icon validation", () => {
  it("should exit program if duplicate icon names are found", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["name.svg", "name.svg"]);

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Duplicate icon name "name" found in files:'),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(" - name.svg"),
    );
  });

  it("should exit program if invalid filename (svg) is provided", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["1name.svg"]);

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Invalid icon name: "1name". Filenames must be strictly kebab-case (lowercase letters, digits, and hyphens only, e.g., "my-icon" or "icon-2x").',
      ),
    );
  });

  it("should exit program if duplicate SVG content is found", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["name1.svg", "name2.svg"]);
    vi.spyOn(fs, "readFile").mockResolvedValue("same content");

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Duplicate SVG content detected in files:"),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(" - name.svg"),
    );
  });

  it("should exit program if content is empty", async () => {
    vi.spyOn(fg, "default").mockResolvedValue(["empty.svg"]);
    vi.spyOn(fs, "readFile").mockResolvedValue("");

    await expect(generate({ dryRun: true })).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Empty SVG content detected in file:"),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "Please ensure the file contains valid SVG data.",
      ),
    );
  });
});
