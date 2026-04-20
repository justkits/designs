import * as fs from "node:fs/promises";

import { atomicWrite } from "@/lib/atomicWrite";

vi.mock("node:fs/promises", async () => {
  return {
    mkdir: vi.fn().mockResolvedValue(undefined),
    rename: vi.fn().mockResolvedValue(undefined),
    rm: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
  };
});
vi.unmock("@/lib/atomicWrite");

describe("atomicWrite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should write content to a temporary file and then rename it", async () => {
    const filePath = "test.txt";
    const content = "hello world";

    await atomicWrite(filePath, content);

    // Verify directory creation
    expect(fs.mkdir).toHaveBeenCalledWith(".", { recursive: true });

    // Verify temporary file write
    expect(fs.writeFile).toHaveBeenCalledWith(
      `${filePath}.tmp`,
      content,
      "utf-8",
    );

    // Verify rename to final path
    expect(fs.rename).toHaveBeenCalledWith(`${filePath}.tmp`, filePath);
  });

  it("should delete temporary file and throw error if rename fails", async () => {
    const filePath = "error.txt";
    const content = "fail";
    // Mock rename to fail
    vi.spyOn(fs, "rename").mockRejectedValueOnce(new Error("rename failed"));

    // Should throw the same error
    await expect(atomicWrite(filePath, content)).rejects.toThrow();

    // Should cleanup the temporary file
    expect(fs.rm).toHaveBeenCalledWith(`${filePath}.tmp`, { force: true });
  });

  it("should handle nested directories", async () => {
    const filePath = "path/to/nested/file.txt";
    const content = "nested content";

    await atomicWrite(filePath, content);

    expect(fs.mkdir).toHaveBeenCalledWith("path/to/nested", {
      recursive: true,
    });
    expect(fs.writeFile).toHaveBeenCalledWith(
      `${filePath}.tmp`,
      content,
      "utf-8",
    );
    expect(fs.rename).toHaveBeenCalledWith(`${filePath}.tmp`, filePath);
  });

  it("should throw error correctly even if error is not an instance of Error", async () => {
    const filePath = "weirdError.txt";
    const content = "weird error";
    // Mock rename to fail with a non-Error value
    vi.spyOn(fs, "rename").mockRejectedValueOnce("string error");

    await expect(atomicWrite(filePath, content)).rejects.toThrow(
      `Error writing file "${filePath}": string error`,
    );

    expect(fs.rm).toHaveBeenCalledWith(`${filePath}.tmp`, { force: true });
  });
});
