import * as fs from "node:fs";
import * as jiti from "jiti";

import { generate } from "@/generate";
import { logger } from "@/lib/logger";

describe("corner cases - invalid config", () => {
  it("should process icons with default config when no config file is found", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    await generate({ dryRun: true });

    expect(logger.info).toHaveBeenCalledWith(
      "No config file... Processing with default config.",
    );
  });

  it("should exit program if user-defined configPath is not found", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    await expect(
      generate({ config: "nonexistent-config.js", dryRun: true }),
    ).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Config file not found at path:"),
    );
  });

  it("should exit program if reading config file fails", async () => {
    const errorMessage = "Failed to read config file";
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(jiti.createJiti(""), "import").mockRejectedValue(
      new Error(errorMessage),
    );

    await expect(
      generate({ config: "dummy-path.js", dryRun: true }),
    ).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to load config"),
    );
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage),
    );
  });
});
