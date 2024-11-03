import moment from 'moment';

import { Task } from '@/models';
import { NotificationItem } from '@/models/NotificationItem.model';
import { useNotificationItemsStore } from '@/stores/store';

export function notifyItem_Welcome(): void {
	const today = moment();
	const notificationItemsStore = useNotificationItemsStore();
	notificationItemsStore.addNotificationItem(
		new NotificationItem(
			'Welcome Back!',
			'You might have some new tasks for this week.',
			'images/user-account-male-1.png',
			undefined,
			'secondary'
		)
	);
	notificationItemsStore.addNotificationItem(
		new NotificationItem(
			`Tasks for ${today.format('dddd')}!`,
			`Tasks for ${today.format('dddd')} are waiting for you.`,
			undefined,
			'event_note'
		)
	);
}

export function notifyItem_TaskAdded(newTask: Task): void {
	const notificationItemsStore = useNotificationItemsStore();
	notificationItemsStore.addNotificationItem(
		new NotificationItem(
			'New Task Added',
			`A new task has been added on ${newTask.date.format('DD/MM/YYYY')}`,
			undefined,
			'task',
			'positive'
		)
	);
}

export function notifyItem_TaskUpdated(): void {
	const notificationItemsStore = useNotificationItemsStore();
	notificationItemsStore.addNotificationItem(
		new NotificationItem(
			'Task Updated',
			'A task has been updated',
			undefined,
			'update',
			'primary'
		)
	);
}

export function notifyItem_TaskDeleted(): void {
	const notificationItemsStore = useNotificationItemsStore();
	notificationItemsStore.addNotificationItem(
		new NotificationItem(
			'Task Deleted',
			'A task has been deleted',
			undefined,
			'scan_delete',
			'negative'
		)
	);
}
