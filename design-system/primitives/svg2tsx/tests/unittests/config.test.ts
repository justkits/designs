import { defineConfig } from "@/config/manager";

describe("defineConfig", () => {
  it("should return the same config object passed to it", () => {
    const config = {
      mode: "barrel" as const,
      suffix: "Icon",
      srcDir: "assets",
      outDir: "src",
    };

    const result = defineConfig(config);

    expect(result).toEqual(config);
    expect(result).toBe(config);
  });

  it("should work with empty config object", () => {
    const config = {};

    const result = defineConfig(config);

    expect(result).toEqual({});
  });
});
