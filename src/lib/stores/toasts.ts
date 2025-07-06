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

// BroadcastChannel for cross-tab syncing
const channel = new BroadcastChannel('davidnet-toasts');

channel.onmessage = (event) => {
  if (event.data?.type === 'toast') {
    const toast = event.data.toast as Omit<ToastData, 'id'>;
    internalToast(toast, true); // true = don't rebroadcast
  }
};

function internalToast(toast: Omit<ToastData, 'id'>, fromRemote = false) {
  const id = ++currentId;
  const newToast = { id, ...toast };
  toasts.update((all) => [...all, newToast]);

  if (!fromRemote) {
    channel.postMessage({ type: 'toast', toast });
  }

  return id;
}

export function toast(toast: Omit<ToastData, 'id'>) {
  return internalToast(toast);
}

export function removeToast(id: number) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}

export { toasts };
