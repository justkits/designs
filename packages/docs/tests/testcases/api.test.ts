import * as fs from "node:fs";

import { getSidebarItems } from "@/nextjs/api";

describe("getSidebarItems", () => {
  const mockManifest = {
    index: [
      { title: "Home", path: "/home" },
      { title: "About", path: "/about" },
    ],
  };

  beforeEach(() => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockManifest));
  });

  it("should read the manifest file and return the sidebar items for the given page", () => {
    const items = getSidebarItems("index");
    expect(items).toEqual(mockManifest["index"]);
  });

  it("returns an empty array if the page is not found in the manifest", () => {
    const items = getSidebarItems("nonexistent");
    expect(items).toEqual([]);
  });
});
