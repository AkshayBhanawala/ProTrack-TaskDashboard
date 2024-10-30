import { defineStore } from 'pinia';
import { Screen } from 'quasar';

import { BiWeeklyTasks } from '@/models';
import { LocalStorageUtil } from '@/utils/localStorage.util';

enum LocalStorageKeys {
	BiWeeklyTasks = 'biWeeklyTasks',
}

function isScreenMini() {
	return Screen?.lt?.lg || (Screen?.gt?.sm && Screen?.lt?.lg);
}

export const useLeftSideBarState = defineStore('LeftSideBarState', {
	state: () => ({
		isOpen: false,
		isMini: isScreenMini(),
		mobileScreenBreakPoint: 600,
	}),
	getters: {
		isSideBarOpen: (state) => state.isOpen,
		isMiniMode: (state) => state.isMini,
	},
	actions: {
		// toggleSideBar() {
		// 	console.log(this, this.isOpen, this.isMiniMode);
		// 	if (this.isOpen) {
		// 		if (this.isMini || isScreenMini()) {
		// 			this.isMini = !this.isMini;
		// 		}
		// 	}
		// },
		toggleSideBar() { this.isOpen = !this.isOpen; },
		setOpen(isOpen: boolean) { this.isOpen = isOpen; },
		setMiniMode(isMiniMode: boolean) { this.isMini = isMiniMode; },
		toggleMiniMode() { this.isMini = !this.isMiniMode; },
	}
});

export const useRightSideBarState = defineStore('RightSideBarState', {
	state: () => ({
		isOpen: false,
	}),
	getters: {
		isSideBarOpen: (state) => state.isOpen,
	},
	actions: {
		toggleSideBar() { this.isOpen = !this.isOpen; },
		setOpen(isOpen: boolean) { this.isOpen = isOpen; },
	}
});

export const useBiWeeklyTasks = defineStore('BiWeeklyTasks', {
	state: () => ({
		biWeeklyTasks: LocalStorageUtil.get<BiWeeklyTasks>(LocalStorageKeys.BiWeeklyTasks) || {},
	}),
	getters: {
		biWeeklyTasks: (state) => state.biWeeklyTasks,
	},
	actions: {
		setBiWeeklyTasks(biWeeklyTasks: BiWeeklyTasks) {
			this.biWeeklyTasks = biWeeklyTasks;
			LocalStorageUtil.set(LocalStorageKeys.BiWeeklyTasks, biWeeklyTasks);
		},
		getWeeklyOverviewDataFromBiWeeklyTasks() {
			const biWeeklyTasks = this.biWeeklyTasks;
			const lastWeek = biWeeklyTasks.lastWeek;
			const thisWeek = biWeeklyTasks.thisWeek;
		}
	}
});
