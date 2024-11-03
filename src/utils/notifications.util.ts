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

export function notifyTaskAdded(): void {
	Notify.create({
		type: 'positive',
		message: 'Task added successfully!',
		// color: 'positive',
	});
}

export function notifyTaskUpdated(): void {
	Notify.create({
		type: 'info',
		message: 'Task updated successfully!',
		// color: 'primary',
	});
}

export function notifyTaskDeleted(): void {
	Notify.create({
		type: 'negative',
		message: 'Task deleted successfully!',
		// color: 'negative',
	});
}

export function notifyNotImplemented(): void {
	Notify.create({
		type: 'warning',
		message: 'Sorry, not implemented yet!',
	});
}
