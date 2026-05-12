import { media } from "@/utils";

describe("utils", () => {
  it("should have correct media breakpoints", () => {
    expect(media.breakpoints.large).toBe("screen and (min-width: 1280px)");
    expect(media.breakpoints.medium).toBe(
      "screen and (min-width: 768px) and (max-width: 1280px)",
    );
    expect(media.breakpoints.small).toBe("screen and (max-width: 768px)");
    expect(media.breakpoints.notLarge).toBe("screen and (max-width: 1280px)");
    expect(media.breakpoints.notSmall).toBe("screen and (min-width: 768px)");
  });

  it("should have correct hoverable media query", () => {
    expect(media.hoverable).toBe("(hover: hover) and (pointer: fine)");
  });
});
