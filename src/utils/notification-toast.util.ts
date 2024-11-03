import { Notify } from 'quasar';

Notify.setDefaults({
	timeout: 3000,
	closeBtn: false,
	progress: true,
	position: 'top',
	textColor: 'text',
	actions: [
		{ icon: 'sym_r_close', color: 'white', round: true }
	],
	classes: 'notification-popup',
});

export function notifyToast_TaskAdded(): void {
	Notify.create({
		type: 'positive',
		message: 'Task added successfully!',
		// color: 'positive',
	});
}

export function notifyToast_TaskUpdated(): void {
	Notify.create({
		type: 'info',
		message: 'Task updated successfully!',
		// color: 'primary',
	});
}

export function notifyToast_TaskDeleted(): void {
	Notify.create({
		type: 'negative',
		message: 'Task deleted successfully!',
		// color: 'negative',
	});
}

export function notifyToast_NotImplemented(): void {
	Notify.create({
		type: 'warning',
		message: 'Sorry, not implemented yet!',
	});
}
