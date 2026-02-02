import { styles as toastStyles } from "$lib/components/messaging/Toast/Toast.css";
import { styles as toasterStyles } from "$lib/components/messaging/Toaster/Toaster.css";
import type { iconType } from "$lib/types/Icon";

const DEFAULT_CONFIG: Partial<Toast> = {
	location: "bottomLeft",
	appearance: "primary"
};

export interface Toast {
	icon?: iconType;
	title: string;
	content?: string;
	durationMS?: number;
	location?: keyof typeof toasterStyles.toastLocation;
	appearance?: keyof typeof toastStyles.appearance;
}

export interface ToastItem extends Toast {
	readonly id: string;
	dismiss: () => void;
}

const toastList = $state<ToastItem[]>([]);

export function toast(toast: Toast) {
	const id = crypto.randomUUID();

	const dismiss = () => {
		const index = toastList.findIndex((t) => t.id === id);
		if (index !== -1) {
			toastList.splice(index, 1);
		}
	};

	if (toast.durationMS && toast.durationMS > 0) {
		setTimeout(dismiss, toast.durationMS);
	}

	const newToast: ToastItem = {
		...DEFAULT_CONFIG,
		...toast,
		id,
		dismiss
	};

	toastList.push(newToast);

	if (toast.title.length > 29) {
		console.warn("[Toast]: Title length exceeds 29 characters.");
	}
}

export const getToasts = () => toastList;
