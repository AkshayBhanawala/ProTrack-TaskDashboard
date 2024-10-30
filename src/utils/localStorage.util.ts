export interface StorageItem<T> {
	value: T;
	timestamp: number;
	expiry?: number; // expiry in milliseconds
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
