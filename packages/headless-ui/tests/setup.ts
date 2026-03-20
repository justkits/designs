vi.stubGlobal(
  "ResizeObserver",
  class ResizeObserver {
    observe() {
      // No-op for testing environment
    }
    unobserve() {
      // No-op for testing environment
    }
    disconnect() {
      // No-op for testing environment
    }
  },
);
