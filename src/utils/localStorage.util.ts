import moment from 'moment';

import { BaseTask, BiWeeklyTasks, IBiWeeklyTasks, INote, ITask, Note, Tag, Task, TaskStatus } from '@/models';

export interface StorageItem<T> {
	value: T;
	timestamp: number;
	expiry?: number; // expiry in milliseconds
}

export enum LocalStorageKeys {
	BiWeeklyTasks = 'biWeeklyTasks',
	Notes = 'Notes',
	RightSideBarState = 'RightSideBarState',
	LeftSideBarState = 'LeftSideBarState',
	SelectedDate = 'SelectedDate',
}

export class LocalStorageUtil {
	static set<T>(key: string, value: T, expiry?: number): void {
		try {
			const item: StorageItem<T> = {
				value,
				timestamp: Date.now(),
				expiry
			};
			localStorage.setItem(key, JSON.stringify(item));
		} catch (error) {
			console.error('Error saving to localStorage:', error);
		}
	}

	static get<T>(key: string): T | null {
		try {
			const item = localStorage.getItem(key);
			if (!item) return null;

			const parsedItem: StorageItem<T> = JSON.parse(item);

			// Check if item has expired
			if (parsedItem.expiry && Date.now() - parsedItem.timestamp > parsedItem.expiry) {
				this.remove(key);
				return null;
			}

			switch (key) {
				case LocalStorageKeys.BiWeeklyTasks:
					return convertStoredTasks(parsedItem.value as IBiWeeklyTasks<Tag>) as T;
				case LocalStorageKeys.Notes:
					return convertStoredNotes(parsedItem.value as INote[]) as T;
			}
			return parsedItem.value;
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			return null;
		}
	}

	static remove(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing from localStorage:', error);
		}
	}

	static clear(): void {
		try {
			localStorage.clear();
		} catch (error) {
			console.error('Error clearing localStorage:', error);
		}
	}

	static isAvailable(): boolean {
		try {
			const testKey = '__test__';
			localStorage.setItem(testKey, testKey);
			localStorage.removeItem(testKey);
			return true;
		} catch (error) {
			return false;
		}
	}

	// Utility method to get all keys with a specific prefix
	static getKeysWithPrefix(prefix: string): string[] {
		const keys: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith(prefix)) {
				keys.push(key);
			}
		}
		return keys;
	}

	// Method to handle storage events (for multi-tab synchronization)
	static onStorageChange(callback: (event: StorageEvent) => void): void {
		window.addEventListener('storage', callback);
	}

	// Method to remove storage event listener
	static offStorageChange(callback: (event: StorageEvent) => void): void {
		window.removeEventListener('storage', callback);
	}
}

// Storage keys constants
export const STORAGE_KEYS = {
	BI_WEEKLY_TASKS: 'BI_WEEKLY_TASKS',
} as const;

export type StorageKeys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

function convertStoredTasks(storedTasks: IBiWeeklyTasks<Tag>): BiWeeklyTasks {
	return {
		lastWeek: convertWeekTasks(storedTasks.lastWeek),
		thisWeek: convertWeekTasks(storedTasks.thisWeek)
	};

	function convertTaskArray(tasks: ITask<TaskStatus, Tag>[]): Task[] {
		return tasks.map(taskData => {
			const task = new Task(
				taskData.label,
				taskData.isCompleted,
				taskData.date ? moment(taskData.date) : undefined
			);

			if (taskData.subtasks?.length) {
				task.subtasks = taskData.subtasks.map(subtask =>
					new BaseTask<boolean>(
						subtask.label,
						subtask.isCompleted,
						subtask.date ? moment(subtask.date) : undefined
					)
				);
			}

			task.tags = taskData?.tags || [];

			return task;
		});
	};

	function convertWeekTasks(weekTasks: { [key: string]: ITask<TaskStatus, Tag>[] } = {}) {
		const converted: { [key: string]: Task[] } = {};
		Object.entries(weekTasks).forEach(([date, tasks]) => {
			converted[date] = convertTaskArray(tasks);
		});
		return converted;
	};
}

function convertStoredNotes(storedNotes: INote[]): Note[] {
	return storedNotes.map(noteData => {
		const note = new Note(
			noteData.title,
			noteData.content,
			moment(noteData.date),
			noteData.attachments
		);

		return note;
	});
}
