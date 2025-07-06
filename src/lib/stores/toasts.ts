import { writable } from 'svelte/store';

export type ToastData = {
  id: number;
  title: string;
  desc?: string;
  icon?: string;
  appearance?: 'info' | 'warning' | 'danger' | 'discover' | 'success' | 'primary';
  autoDismiss?: number | null;
  position: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';
};

const toasts = writable<ToastData[]>([]);
let currentId = 0;

export function toast(toast: Omit<ToastData, 'id'>) {
  const id = ++currentId;
  toasts.update(all => [...all, { id, ...toast }]);
  return id;
}

export function removeToast(id: number) {
  toasts.update(all => all.filter(t => t.id !== id));
}

export { toasts };
