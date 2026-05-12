import { generate } from "@/generate";
import { atomicWrite } from "@/lib/atomicWrite";
import { prepareConfig } from "../setup";

vi.mock("fast-glob", () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockResolvedValue([
      `arrow/arrow.svg`,
      `arrow/arrow-right.svg`,
      `home/home.svg`,
      `home/home-filled.svg`,
    ]),
}));

describe("generate - family directory structure", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe("default config (barrel mode, no suffix)", () => {
    it("should generate correct files and content", async () => {
      await generate({ dryRun: false });

      // 컴포넌트 파일 4개 + index.ts 2개 = 6회 호출
      expect(atomicWrite).toHaveBeenCalledTimes(6);

      // Check generated component files
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/components/Arrow.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/components/ArrowRight.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/components/Home.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/components/HomeFilled.tsx",
        expect.stringContaining("<svg />"),
      );

      // Check generated index file (한줄씩만 확인)
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/index.ts",
        expect.stringContaining(
          `export { Arrow } from "./components/Arrow";\n`,
        ),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/index.ts",
        expect.stringContaining(`export { Home } from "./components/Home";\n`),
      );
    });
  });

  describe("facade mode", () => {
    it("should generate correct files and content", async () => {
      prepareConfig({ mode: "facade" });
      await generate({ dryRun: false, config: "dummy-path" });

      // 아이콘 4개 + index.ts 2개 + iconMap 2개 + facade 컴포넌트 2개 = 10회 호출
      expect(atomicWrite).toHaveBeenCalledTimes(10);

      // Check generated component files
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/components/Arrow.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/components/ArrowRight.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/components/Home.tsx",
        expect.stringContaining("<svg />"),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/components/HomeFilled.tsx",
        expect.stringContaining("<svg />"),
      );

      // Check generated index file (한줄씩만 확인)
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/arrow/index.ts",
        expect.stringContaining(`export { ArrowIcon } from "./ArrowIcon";`),
      );
      expect(atomicWrite).toHaveBeenCalledWith(
        "src/home/index.ts",
        expect.stringContaining(`export { HomeIcon } from "./HomeIcon";`),
      );
    });
  });
});
