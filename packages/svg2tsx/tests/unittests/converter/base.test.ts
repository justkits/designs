import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import glob from "fast-glob";

import { FamilySvgBuilder } from "@converter/family";
import { defaultOptions } from "@converter/options";
import { atomicWrite } from "@lib/atomicWrite";
import { logger } from "@lib/logger";
import { mockAssetsDir, mockBaseDir } from "@tests/setup/mocks";

// 공통된 코드를 작성하기 때문에,
// FamilySvgBuilder, StandaloneSvgBuilder 중 아무거나 사용해도 무방하다.

describe("BaseSvgBuilder", () => {
  let builder: FamilySvgBuilder;

  beforeEach(async () => {
    vi.clearAllMocks();
    builder = new FamilySvgBuilder(defaultOptions, mockBaseDir);
    vi.spyOn(console, "table").mockImplementation(() => {});
  });

  it("should generate components successfully", async () => {
    await builder.generate();

    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("media/components/Test.tsx"),
      expect.any(String),
    );
    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("media/components/SecondTest.tsx"),
      expect.any(String),
    );
    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("action/components/Arrow.tsx"),
      expect.any(String),
    );
  });

  it("should generate components successfully with index and suffix", async () => {
    builder = new FamilySvgBuilder(defaultOptions, mockBaseDir, "Icon", true);
    vi.spyOn(console, "table").mockImplementation(() => {});

    await builder.generate();

    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("media/index.ts"),
      expect.stringContaining(
        'export { TestIcon } from "./components/TestIcon";',
      ),
    );
    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("action/index.ts"),
      expect.stringContaining(
        'export { ArrowIcon } from "./components/ArrowIcon";',
      ),
    );

    expect(atomicWrite).toHaveBeenCalledWith(
      expect.stringContaining("src/index.ts"),
      expect.stringContaining(
        'export { SecondTestIcon, TestIcon } from "./media";',
      ),
    );
  });

  it("should fail invalid kebab-case filename", async () => {
    // 편의상 여기서는 하나만 테스트
    (glob as unknown as Mock).mockResolvedValue([
      resolve(mockAssetsDir, "media/Invalid_Name.svg"),
    ]);
    await expect(builder.generate()).rejects.toThrow(
      'Invalid filename: "Invalid_Name". Filenames must be strictly kebab-case (lowercase letters and single dashes only, e.g., "my-icon").',
    );
  });

  it("should throw error for duplicate component names", async () => {
    (glob as unknown as Mock).mockResolvedValue([
      resolve(mockAssetsDir, "media/icon-one.svg"),
      resolve(mockAssetsDir, "action/icon-one.svg"),
    ]);
    (readFile as unknown as Mock).mockImplementation((filePath: string) => {
      return filePath.includes("media")
        ? Promise.resolve("<svg>content1</svg>")
        : Promise.resolve("<svg>content2</svg>");
    });

    await expect(builder.generate()).rejects.toThrow(
      "Duplicate component names found",
    );
  });

  it("should throw error for duplicate SVG content", async () => {
    (glob as unknown as Mock).mockResolvedValue([
      resolve(mockAssetsDir, "media/icon-one.svg"),
      resolve(mockAssetsDir, "media/icon-two.svg"),
    ]);
    (readFile as unknown as Mock).mockResolvedValue(
      Promise.resolve("<svg>same content</svg>"),
    );

    await expect(builder.generate()).rejects.toThrow(
      "Duplicate SVG content found",
    );
  });
});

describe("BaseSvgBuilder - dry-run mode", () => {
  let dryRunBuilder: FamilySvgBuilder;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "table").mockImplementation(() => {});

    (glob as unknown as Mock).mockResolvedValue([
      `${mockAssetsDir}/media/test.svg`,
      `${mockAssetsDir}/media/second-test.svg`,
      `${mockAssetsDir}/action/arrow.svg`,
    ]);
    (readFile as unknown as Mock).mockImplementation((filePath: string) => {
      const fileName = filePath.split("/").pop() ?? "";
      if (fileName === "test.svg")
        return Promise.resolve("<svg><path d='M1'/></svg>");
      if (fileName === "second-test.svg")
        return Promise.resolve("<svg><circle r='10'/></svg>");
      if (fileName === "arrow.svg")
        return Promise.resolve("<svg><path d='M2'/></svg>");
      return Promise.resolve("<svg><rect/></svg>");
    });

    dryRunBuilder = new FamilySvgBuilder(
      defaultOptions,
      mockBaseDir,
      "",
      true,
      "assets",
      "src",
      true,
    );
  });

  it("should not write any files", async () => {
    await dryRunBuilder.generate();

    expect(atomicWrite).not.toHaveBeenCalled();
  });

  it("should not delete any files", async () => {
    await dryRunBuilder.generate();

    expect(rm).not.toHaveBeenCalled();
  });

  it("should log a dry-run banner", async () => {
    await dryRunBuilder.generate();

    expect(logger.detail).toHaveBeenCalledWith(
      expect.stringContaining("[Dry Run]"),
    );
  });

  it("should log would-write messages instead of writing", async () => {
    await dryRunBuilder.generate();

    expect(logger.detail).toHaveBeenCalledWith(
      expect.stringMatching(/\[Dry Run\] Would write:/),
    );
  });

  it("should log a would-generate summary message", async () => {
    await dryRunBuilder.generate();

    expect(logger.success).toHaveBeenCalledWith(
      expect.stringContaining("[Dry Run] Would generate"),
    );
  });

  it("should log would-delete messages instead of deleting when manifest exists", async () => {
    const manifestEntries = ["src/media/components/Test.tsx"];
    (readFile as unknown as Mock).mockImplementation((filePath: string) => {
      if (filePath.includes("manifest.json"))
        return Promise.resolve(JSON.stringify(manifestEntries));
      const fileName = filePath.split("/").pop() ?? "";
      if (fileName === "test.svg")
        return Promise.resolve("<svg><path d='M1'/></svg>");
      if (fileName === "second-test.svg")
        return Promise.resolve("<svg><circle r='10'/></svg>");
      if (fileName === "arrow.svg")
        return Promise.resolve("<svg><path d='M2'/></svg>");
      return Promise.resolve("<svg><rect/></svg>");
    });

    await dryRunBuilder.generate();

    expect(rm).not.toHaveBeenCalled();
    expect(logger.detail).toHaveBeenCalledWith(
      expect.stringMatching(/\[Dry Run\] Would delete:/),
    );
  });

  it("should still validate naming rules in dry-run mode", async () => {
    (glob as unknown as Mock).mockResolvedValue([
      resolve(mockAssetsDir, "media/Invalid_Name.svg"),
    ]);

    await expect(dryRunBuilder.generate()).rejects.toThrow(
      'Invalid filename: "Invalid_Name"',
    );
  });

  it("should still detect duplicate component names in dry-run mode", async () => {
    (glob as unknown as Mock).mockResolvedValue([
      resolve(mockAssetsDir, "media/icon-one.svg"),
      resolve(mockAssetsDir, "action/icon-one.svg"),
    ]);
    (readFile as unknown as Mock).mockImplementation((filePath: string) =>
      filePath.includes("media")
        ? Promise.resolve("<svg>content1</svg>")
        : Promise.resolve("<svg>content2</svg>"),
    );

    await expect(dryRunBuilder.generate()).rejects.toThrow(
      "Duplicate component names found",
    );
  });
});
