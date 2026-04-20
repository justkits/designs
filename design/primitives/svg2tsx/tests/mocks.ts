vi.mock("node:fs", () => ({
  existsSync: vi.fn().mockReturnValue(true),
}));
vi.mock("node:fs/promises", () => ({
  readFile: vi.fn().mockImplementation((filePath: string) => {
    if (filePath.includes("arrow.svg")) {
      return Promise.resolve("arrow icon content");
    } else if (filePath.includes("arrow-right.svg")) {
      return Promise.resolve("arrow-right icon content");
    } else if (filePath.includes("home.svg")) {
      return Promise.resolve("home icon content");
    }
    return Promise.resolve("home-filled icon content");
  }),
  rm: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("fast-glob", () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockResolvedValue([
      `arrow.svg`,
      `arrow-right.svg`,
      `home.svg`,
      `home-filled.svg`,
    ]),
}));
vi.mock("jiti", () => ({
  createJiti: vi.fn().mockReturnValue({
    import: vi.fn().mockResolvedValue({}),
  }),
}));

vi.mock("@svgr/core", () => ({
  transform: vi
    .fn()
    .mockResolvedValue("export function Component() { return <svg />; }"),
}));

vi.mock("@/lib/atomicWrite", () => ({
  atomicWrite: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/lib/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}));
