import { generate } from "@/generate";
import { atomicWrite } from "@/lib/atomicWrite";
import { prepareConfig, setup } from "../setup";

describe("generate - flat directory structure", () => {
  setup();

  describe("default config (barrel mode, no suffix)", () => {
    it("should generate correct files and content", async () => {
      await generate({ dryRun: false });

      expect(atomicWrite).toHaveBeenCalledTimes(5);

      // Check generated component files
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/Arrow.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/ArrowRight.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/Home.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/HomeFilled.tsx",
        expect.stringContaining("<svg />"),
      );

      // Check generated index file (한줄만 확인)
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/index.ts",
        expect.stringContaining(
          `export { Arrow } from "./components/Arrow";\n`,
        ),
      );
    });
  });

  describe("facade mode", () => {
    it("should generate correct files and content", async () => {
      prepareConfig({ mode: "facade" });
      await generate({ dryRun: false, config: "dummy-path" });

      // 아이콘 4개 + index.ts + iconMap + facade 컴포넌트 = 7회 호출
      expect(atomicWrite).toHaveBeenCalledTimes(7);

      // Check generated component files
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/Arrow.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/ArrowRight.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/Home.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/components/HomeFilled.tsx",
        expect.stringContaining("<svg />"),
      );

      // Check generated index file
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/index.ts",
        expect.stringContaining(`export { Icon } from "./Icon";`),
      );

      // Check generated facade component file
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/Icon.tsx",
        expect.stringContaining(
          'import type { IconProps } from "@justkits/svg2tsx"',
        ),
      );

      // Check generated icon map file
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/iconMap.ts",
        expect.stringContaining(
          "export const iconMap: Record<IconName, ComponentType<IconProps>> = {",
        ),
      );
    });
  });
});
