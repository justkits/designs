import { AlerterObject } from "./types";

let alert: AlerterObject | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): AlerterObject | null {
  return alert;
}

export function dispatch(incoming: AlerterObject | null): void {
  if (globalThis.window === undefined || typeof document === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Alert] Alert cannot be shown in a non-browser environment. Ignoring alert...",
      );
    }
    return;
  }

  if (alert && incoming) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      );
    }
    return;
  }

  alert = incoming;
  notify();
}
