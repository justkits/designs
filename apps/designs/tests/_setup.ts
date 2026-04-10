export function rootLayoutSetup() {
  const originalError = console.error;
  // RootLayout이 html을 반환해서 발생하는 경고 무시
  beforeAll(() => {
    console.error = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("cannot be a child of")
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });
}
