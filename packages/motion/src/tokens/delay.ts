export type AnimationDelay = number | "none" | "short" | "medium" | "long";

export function resolveDelay(delay: AnimationDelay): string {
  if (delay === "none") {
    return "0ms";
  }
  if (delay === "short") {
    return "100ms";
  }
  if (delay === "medium") {
    return "300ms";
  }
  if (delay === "long") {
    return "500ms";
  }

  if (process.env.NODE_ENV !== "production" && delay < 0) {
    console.warn(
      `Invalid delay value: ${delay}. Negative delays have unexpected CSS behavior.`,
    );
  }

  return delay + "ms";
}
