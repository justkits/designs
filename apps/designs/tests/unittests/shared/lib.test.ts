import { colorWithOpacity } from "@shared/lib/colors";
import { media } from "@shared/lib/media";

describe("shared lib tests", () => {
  describe("colors", () => {
    it("should return color with opacity", () => {
      const result = colorWithOpacity("#ff0000", 50);
      expect(result).toBe(
        "color-mix(in srgb, #ff0000 50%, light-dark(#ffffff, #000000))",
      );
    });
  });

  describe("media queries", () => {
    it("should have hoverable media query", () => {
      expect(media.hoverable).toBe("(hover: hover) and (pointer: fine)");
    });

    it("should have breakpoints", () => {
      expect(media.breakpoints).toBeDefined();
    });
  });
});
