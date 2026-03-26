export function setupConsoleSpy(env: string) {
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeAll(() => vi.stubEnv("NODE_ENV", env));
  afterEach(() => {
    warnSpy.mockClear();
    errorSpy.mockClear();
  });
  afterAll(() => vi.unstubAllEnvs());

  return { warnSpy, errorSpy };
}

export function setupSSR() {
  beforeEach(() => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
