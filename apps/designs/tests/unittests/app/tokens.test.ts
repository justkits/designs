import {
  elevationValues,
  radiusValues,
  spacingValues,
} from "@app/root/lib/boxes";
import { baseColors, colorValues } from "@app/root/lib/colors";
import { fontValues } from "@app/root/lib/fonts";

describe("Design Tokens", () => {
  it("should have valid color tokens", () => {
    expect(colorValues).toBeDefined();
    expect(colorValues.primary).toContain(baseColors.BLUE.dark);
    expect(colorValues.primary).toContain(baseColors.BLUE.light);
  });

  it("should have valid font tokens", () => {
    expect(fontValues).toBeDefined();
    expect(fontValues.hero).toContain("bolder");
    expect(fontValues.hero).toContain("3rem");
  });

  it("should have valid elevation tokens", () => {
    expect(elevationValues).toBeDefined();
    expect(elevationValues.lv1).toContain("rgba(127, 127, 127, 0.2)");
  });

  it("should have valid radius tokens", () => {
    expect(radiusValues).toBeDefined();
    expect(radiusValues.md).toBe("8px");
  });

  it("should have valid spacing tokens", () => {
    expect(spacingValues).toBeDefined();
    expect(spacingValues.atoms.sm).toBe("4px");
    expect(spacingValues.sections.lg).toBe("24px");
    expect(spacingValues.layouts.sm).toBe("24px");
  });
});
