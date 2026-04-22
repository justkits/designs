import {
  themeColors,
  themeTypography,
  themeTexts,
  themeElevation,
} from "@/theme/values";

describe("themeColors", () => {
  it("has all required keys", () => {
    const keys = [
      "primary",
      "primaryHover",
      "onPrimary",
      "secondary",
      "secondaryHover",
      "onSecondary",
      "success",
      "warning",
      "error",
      "info",
      "background",
      "backgroundHover",
      "surface",
      "overlay",
      "text",
      "textMuted",
      "textDisabled",
      "border",
      "borderMuted",
      "borderInverted",
    ];
    for (const key of keys) {
      expect(themeColors[key as keyof typeof themeColors]).toBeDefined();
    }
  });
});

describe("themeTypography", () => {
  it("has fontSize entries", () => {
    expect(themeTypography.fontSize.headingLarge).toBe("2.5rem");
    expect(themeTypography.fontSize.bodyMedium).toBe("1rem");
  });

  it("has fontFamily entries", () => {
    expect(themeTypography.fontFamily.normal).toContain("Google Sans");
    expect(themeTypography.fontFamily.code).toContain("JetBrains Mono");
  });

  it("has fontWeight entries", () => {
    expect(themeTypography.fontWeight.regular).toBe("400");
    expect(themeTypography.fontWeight.bold).toBe("700");
  });
});

describe("themeTexts", () => {
  it("has all text style keys", () => {
    const keys = [
      "hero",
      "titleLarge",
      "titleMedium",
      "titleSmall",
      "bodyLarge",
      "bodyMedium",
      "bodySmall",
      "description",
      "code",
      "quote",
    ];
    for (const key of keys) {
      expect(themeTexts[key as keyof typeof themeTexts]).toBeDefined();
    }
  });

  it("hero includes brand font family", () => {
    expect(themeTexts.hero).toContain("Kalam");
  });
});

describe("themeElevation", () => {
  it("has lv1, lv2, lv3", () => {
    expect(themeElevation.lv1).toBeDefined();
    expect(themeElevation.lv2).toBeDefined();
    expect(themeElevation.lv3).toBeDefined();
  });
});
