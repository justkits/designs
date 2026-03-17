import { resolveDuration } from "@/transition/lib";
import { transition } from "@/transition/transition";

describe("transition", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("entry animations", () => {
    it("returns correct default style for entry animation", () => {
      const style = transition({ name: "fade" });

      expect(style).toHaveProperty("animationName", "fade-in");
      expect(style).toHaveProperty("animationDuration", "600ms");
      expect(style).toHaveProperty(
        "animationTimingFunction",
        "cubic-bezier(0.4, 0, 0.2, 1)",
      );
      expect(style).toHaveProperty("animationDelay", "100ms");
      expect(style).toHaveProperty("animationIterationCount", 1);
    });

    it("returns correct style for entry animation with custom options", () => {
      const style = transition({
        name: "slide-up",
        easing: "ease-in-out",
        duration: "fast",
        delay: "medium",
      });

      expect(style).toHaveProperty("animationName", "slide-up-in");
      expect(style).toHaveProperty("animationDuration", "400ms");
      expect(style).toHaveProperty("animationTimingFunction", "ease-in-out");
      expect(style).toHaveProperty("animationDelay", "300ms");
      expect(style).toHaveProperty("animationIterationCount", 1);
    });

    it("returns empty style when reduced motion is preferred", () => {
      vi.spyOn(globalThis.window, "matchMedia").mockImplementationOnce(
        (query: string) =>
          ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }) as unknown as MediaQueryList,
      );

      const style = transition({ name: "pop" });
      expect(style).toEqual({});
    });
  });

  describe("exit animations", () => {
    it("returns correct default style for exit animation", () => {
      const style = transition({ name: "fade", exiting: true });

      expect(style).toHaveProperty("animationName", "fade-out");
      expect(style).toHaveProperty("animationDuration", "600ms");
      expect(style).toHaveProperty(
        "animationTimingFunction",
        "cubic-bezier(0.4, 0, 0.2, 1)",
      );
      expect(style).toHaveProperty("animationDelay", "100ms");
      expect(style).toHaveProperty("animationIterationCount", 1);
    });

    it("returns correct style for exit animation with custom options", () => {
      const style = transition({
        name: "slide-up",
        easing: "ease",
        duration: 1000,
        delay: "none",
        exiting: true,
      });

      expect(style).toHaveProperty("animationName", "slide-up-out");
      expect(style).toHaveProperty("animationDuration", "1000ms");
      expect(style).toHaveProperty("animationTimingFunction", "ease");
      expect(style).toHaveProperty("animationDelay", "0ms");
      expect(style).toHaveProperty("animationIterationCount", 1);
    });

    it("returns empty style for exit animation when reduced motion is preferred", () => {
      vi.spyOn(globalThis.window, "matchMedia").mockImplementationOnce(
        (query: string) =>
          ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          }) as unknown as MediaQueryList,
      );

      const style = transition({ name: "pop", exiting: true });
      expect(style).toEqual({});
    });
  });
});

describe("resolveDuration", () => {
  it("resolves 'fast' to 400ms", () => {
    expect(resolveDuration("fast")).toBe(400);
  });

  it("resolves 'normal' to 600ms", () => {
    expect(resolveDuration("normal")).toBe(600);
  });

  it("resolves 'slow' to 800ms", () => {
    expect(resolveDuration("slow")).toBe(800);
  });

  it("returns numeric duration as is", () => {
    expect(resolveDuration(500)).toBe(500);
  });
});
