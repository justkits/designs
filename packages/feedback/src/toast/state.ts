import { ToastObject } from "./types";

let toasts: ToastObject[] = [];
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ToastObject[] {
  return toasts;
}

export function addToast(toast: ToastObject): void {
  toasts = [...toasts, toast];
  notify();
}

export function removeToast(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}
