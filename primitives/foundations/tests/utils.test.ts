import {
  createBreakpointQueries,
  createSimpleBreakpointQueries,
} from "@/breakpoint/utils";
import { colorWithOpacity } from "@/color/utils";

describe("utils", () => {
  it("createSimpleBreakpointQueries should return simple breakpoint queries", () => {
    const result = createSimpleBreakpointQueries({
      sm: "600px",
      lg: "1024px",
    });
    expect(result).toEqual({
      small: "screen and (max-width: 600px)",
      medium: "screen and (min-width: 600px) and (max-width: 1024px)",
      large: "screen and (min-width: 1024px)",
      notSmall: "screen and (min-width: 600px)",
      notLarge: "screen and (max-width: 1024px)",
    });
  });

  it("createBreakpointQueries should return breakpoint queries", () => {
    const result = createBreakpointQueries({
      xs: "480px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    });
    expect(result).toEqual({
      mobilePortrait: {
        only: "screen and (max-width: 480px)",
      },
      mobileLandscape: {
        only: "screen and ((min-width: 480px) and (max-width: 600px))",
        andSmaller: "screen and (max-width: 600px)",
        andLarger: "screen and (min-width: 480px)",
      },
      tabletPortrait: {
        only: "screen and ((min-width: 600px) and (max-width: 768px))",
        andSmaller: "screen and (max-width: 768px)",
        andLarger: "screen and (min-width: 600px)",
      },
      tabletLandscape: {
        only: "screen and ((min-width: 768px) and (max-width: 1024px))",
        andSmaller: "screen and (max-width: 1024px)",
        andLarger: "screen and (min-width: 768px)",
      },
      laptop: {
        only: "screen and (min-width: 1024px) and (max-width: 1280px)",
        andSmaller: "screen and (max-width: 1280px)",
        andLarger: "screen and (min-width: 1024px)",
      },
      desktop: {
        only: "screen and (min-width: 1280px)",
      },
    });
  });

  it("colorWithOpacity should return color with opacity", () => {
    const result = colorWithOpacity("#ff0000", 50);
    expect(result).toBe(
      "color-mix(in srgb, #ff0000 50%, light-dark(#ffffff, #000000))",
    );
  });
});
