vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
}));
