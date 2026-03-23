import { ToastStateObject } from "./types";

let toasts: ToastStateObject[] = [];
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ToastStateObject[] {
  return toasts;
}

export function addToast(toast: ToastStateObject): void {
  toasts = [...toasts, toast];
  notify();
}

export function removeToast(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}
