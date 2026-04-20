import { generate } from "@/generate";
import { atomicWrite } from "@/lib/atomicWrite";
import { logger } from "@/lib/logger";

describe("dry run", () => {
  it("should complete without writing files", async () => {
    await generate({ dryRun: true });

    expect(atomicWrite).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("[Dry Run] No files written. Completed in"),
    );
  });
});
