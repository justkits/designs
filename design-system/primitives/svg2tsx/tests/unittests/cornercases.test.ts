import * as fs from "node:fs/promises";
import { join } from "node:path";

import { defaultSvgrConfig } from "@/config/svgr";
import { Converter } from "@/converter/converter";
import { clean } from "@/lib/clean";

describe("svg2tsx - corner cases", () => {
  describe("converter", () => {
    it("should throw if processIcons() is called before scanAssets()", async () => {
      const converter = new Converter();
      await expect(converter.processIcons()).rejects.toThrow(
        "SVG files have not been loaded. Call scanAssets() first.",
      );
    });
  });

  describe("clean", () => {
    it("should throw error if rm() fails", async () => {
      vi.spyOn(fs, "rm").mockRejectedValue(
        new Error("Failed to remove directory"),
      );
      const path = join(process.cwd(), "test-dir");
      await expect(clean(path)).rejects.toThrow("Failed to remove directory");
    });

    it("should handle error message correctly when rm() fails with non-Error", async () => {
      vi.spyOn(fs, "rm").mockRejectedValue("String error");
      const path = join(process.cwd(), "test-dir");
      await expect(clean(path)).rejects.toThrow("Error cleaning directory");
    });
  });

  describe("svgr", () => {
    it("COVERAGE PURPOSE - should have correct template output", () => {
      const { template } = defaultSvgrConfig;
      const variables = {
        componentName: "TestIcon",
        jsx: "<svg></svg>",
        interfaces: [],
        props: [],
        imports: [],
        exports: [],
      };
      const result = template?.(variables, {
        tpl: (strings: TemplateStringsArray) => strings[0],
        options: { state: { componentName: variables.componentName } },
      });
      expect(result).toContain(
        'import type { IconProps } from "@justkits/svg2tsx";',
      );
    });
  });
});
