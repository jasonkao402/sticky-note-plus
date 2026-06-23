import { writable } from 'svelte/store';

export type ToastType = 'info' | 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // milliseconds, default 3000
}

export const toasts = writable<Toast[]>([]);

let toastIdCounter = 0;

export function showToast(message: string, type: ToastType = 'info', duration: number = 3000) {
  const id = String(toastIdCounter++);
  const toast: Toast = { id, message, type, duration };

  toasts.update((all) => [...all, toast]);

  // Auto-remove after duration
  setTimeout(() => {
    toasts.update((all) => all.filter((t) => t.id !== id));
  }, duration);
}