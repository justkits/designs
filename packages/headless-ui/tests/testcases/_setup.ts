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
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
  });

  afterEach(() => {
    vi.stubGlobal("window", originalWindow);
    vi.stubGlobal("document", originalDocument);
  });
}

export function setupTimer() {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
}
