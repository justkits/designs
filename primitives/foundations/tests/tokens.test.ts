import {
  breakpointCSSVariables,
  breakpointVariables,
  defaultBreakpoints,
} from "@/breakpoint/variables";
import { colorCSSVariables, colorVariables } from "@/color/variables";
import {
  elevationCSSVariables,
  elevationVariables,
} from "@/elevation/variables";
import {
  textCSSVariables,
  textVariables,
  typographyCSSVariables,
  typographyVariables,
} from "@/typography/variables";
import {
  defaultRadius,
  radiusCSSVariables,
  radiusVariables,
} from "@/radius/variables";
import {
  defaultSpacing,
  spacingCSSVariables,
  spacingVariables,
} from "@/spacing/variables";

describe("tokens", () => {
  describe("breakpoint", () => {
    it("breakpointVariables values are plain strings (no var())", () => {
      for (const key in breakpointVariables) {
        const value =
          breakpointVariables[key as keyof typeof breakpointVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("breakpointCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in breakpointCSSVariables) {
        const value =
          breakpointCSSVariables[key as keyof typeof breakpointCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });

    it("defaultBreakpoints values", () => {
      expect(defaultBreakpoints).toEqual({
        xs: "480px",
        sm: "768px",
        md: "1024px",
        lg: "1280px",
        xl: "1440px",
      });
    });
  });

  describe("color", () => {
    it("colorVariables values are plain strings (no var())", () => {
      for (const key in colorVariables) {
        const value = colorVariables[key as keyof typeof colorVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("colorCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in colorCSSVariables) {
        const value = colorCSSVariables[key as keyof typeof colorCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });
  });

  describe("elevation", () => {
    it("elevationVariables values are plain strings (no var())", () => {
      for (const key in elevationVariables) {
        const value =
          elevationVariables[key as keyof typeof elevationVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("elevationCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in elevationCSSVariables) {
        const value =
          elevationCSSVariables[key as keyof typeof elevationCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });
  });

  describe("typography", () => {
    it("textVariables values are plain strings (no var())", () => {
      for (const key in textVariables) {
        const value = textVariables[key as keyof typeof textVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("textCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in textCSSVariables) {
        const value = textCSSVariables[key as keyof typeof textCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });

    it("typographyVariables define fontSize, lineHeight, fontWeight and fontFamily tokens", () => {
      const keys = [
        "fontSize",
        "lineHeight",
        "fontWeight",
        "fontFamily",
      ] as const;
      for (const key of keys) {
        const value = typographyVariables[key];
        expect(value).toBeDefined();
        expect(typeof value).toBe("object");
      }
    });

    it("typographyVariables fontSize and lineHeight tokens are plain strings (no var())", () => {
      const sizeKeys = [
        "headingSmall",
        "headingMedium",
        "headingLarge",
        "bodySmall",
        "bodyMedium",
        "bodyLarge",
      ] as const;
      for (const key of sizeKeys) {
        const fontSizeValue = typographyVariables.fontSize[key];
        const lineHeightValue = typographyVariables.lineHeight[key];
        expect(fontSizeValue).toBeDefined();
        expect(typeof fontSizeValue).toBe("string");
        expect(fontSizeValue).not.toContain("var(");
        expect(lineHeightValue).toBeDefined();
        expect(typeof lineHeightValue).toBe("string");
        expect(lineHeightValue).not.toContain("var(");
      }
    });

    it("typographyCSSVariables defines fontSize, lineHeight, fontWeight and fontFamily tokens", () => {
      const keys = [
        "fontSize",
        "lineHeight",
        "fontWeight",
        "fontFamily",
      ] as const;
      for (const key of keys) {
        const value = typographyCSSVariables[key];
        expect(value).toBeDefined();
        expect(typeof value).toBe("object");
      }
    });

    it("typographyCSSVariables fontSize and lineHeight tokens are CSS variable references (var(--...))", () => {
      const sizeKeys = [
        "headingSmall",
        "headingMedium",
        "headingLarge",
        "bodySmall",
        "bodyMedium",
        "bodyLarge",
      ] as const;
      for (const key of sizeKeys) {
        const fontSizeValue = typographyCSSVariables.fontSize[key];
        const lineHeightValue = typographyCSSVariables.lineHeight[key];
        expect(fontSizeValue).toBeDefined();
        expect(typeof fontSizeValue).toBe("string");
        expect(fontSizeValue).toMatch(/^var\(--.+\)$/);
        expect(lineHeightValue).toBeDefined();
        expect(typeof lineHeightValue).toBe("string");
        expect(lineHeightValue).toMatch(/^var\(--.+\)$/);
      }
    });
  });

  describe("radius", () => {
    it("radiusVariables values are plain strings (no var())", () => {
      for (const key in radiusVariables) {
        const value = radiusVariables[key as keyof typeof radiusVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("radiusCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in radiusCSSVariables) {
        const value =
          radiusCSSVariables[key as keyof typeof radiusCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });

    it("defaultRadius values", () => {
      expect(defaultRadius).toEqual({
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "50%",
      });
    });
  });

  describe("spacing", () => {
    it("spacingVariables values are plain strings (no var())", () => {
      for (const key in spacingVariables) {
        const value = spacingVariables[key as keyof typeof spacingVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).not.toContain("var(");
      }
    });

    it("spacingCSSVariables values are CSS variable references (var(--...))", () => {
      for (const key in spacingCSSVariables) {
        const value =
          spacingCSSVariables[key as keyof typeof spacingCSSVariables];
        expect(value).toBeDefined();
        expect(typeof value).toBe("string");
        expect(value).toMatch(/^var\(--.+\)$/);
      }
    });

    it("defaultSpacing values", () => {
      expect(defaultSpacing).toEqual({
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        layoutSmall: "24px",
        layoutMedium: "36px",
        layoutLarge: "48px",
      });
    });
  });
});
