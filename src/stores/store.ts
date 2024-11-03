import moment, { Moment } from 'moment';
import { defineStore } from 'pinia';
import { Loading, Screen } from 'quasar';

import { BiWeeklyTasks, getRandomTagColor, Note, PartialTaskStatus, TagColorMap, TagColorMapType, TagNames, TagNameType, Task, TaskCount, TaskCountType } from '@/models';
import { NotificationItem } from '@/models/NotificationItem.model';
import { MinMaxDates, WeeklyOverviewData } from '@/models/WeeklyOverview.model';
import { LocalStorageKeys, LocalStorageUtil } from '@/utils/localStorage.util';
import { notifyItem_TaskAdded, notifyItem_TaskDeleted, notifyItem_TaskUpdated } from '@/utils/notification-item.util';

function isScreenMini() {
	return Screen?.lt?.lg || (Screen?.gt?.sm && Screen?.lt?.lg);
}

type LeftSideBarState = { isOpen: boolean, isMini: boolean, mobileScreenBreakPointPx: number };

export const useGlobalSpinnerStore = defineStore('GlobalSpinnerState', {
	state: (): { isGlobalLoading: boolean } => ({
		isGlobalLoading: false,
	}),
	getters: {
		isLoading: (state) => state.isGlobalLoading,
	},
	actions: {
		setLoading(isLoading: boolean): void {
			this.isGlobalLoading = isLoading;
		},
		toggle(): void {
			this.isGlobalLoading = !this.isGlobalLoading;
		},
		show(): void {
			this.isGlobalLoading = true;
		},
		hide(): void {
			this.isGlobalLoading = false;
		}
	}
});
useGlobalSpinnerStore().$subscribe((_mutation, state) => {
	if (state.isGlobalLoading) {
		Loading.show();
	} else {
		Loading.hide();
	}
});

export const useLeftSideBarStore = defineStore('LeftSideBarState', {
	state: (): LeftSideBarState => {
		return LocalStorageUtil.get<LeftSideBarState>(LocalStorageKeys.LeftSideBarState) || {
			isOpen: false,
			isMini: isScreenMini(),
			mobileScreenBreakPointPx: 1440,
		};
	},
	getters: {
		isSideBarOpen: (state) => state.isOpen,
		isMiniMode: (state) => state.isMini,
		mobileScreenBreakPoint: (state) => state.mobileScreenBreakPointPx,
		getState: (state): LeftSideBarState => ({
			isOpen: state.isOpen,
			isMini: state.isMini,
			mobileScreenBreakPointPx: state.mobileScreenBreakPointPx
		}),
	},
	actions: {
		toggleSideBar(): void {
			this.isOpen = !this.isOpen;
			LocalStorageUtil.set(LocalStorageKeys.LeftSideBarState, this.getState);
		},
		setOpen(isOpen: boolean): void {
			this.isOpen = isOpen;
			LocalStorageUtil.set(LocalStorageKeys.LeftSideBarState, this.getState);
		},
		setMiniMode(isMiniMode: boolean): void {
			this.isMini = isMiniMode;
			LocalStorageUtil.set(LocalStorageKeys.LeftSideBarState, this.getState);
		},
		toggleMiniMode(): void {
			this.isMini = !this.isMini;
			LocalStorageUtil.set(LocalStorageKeys.LeftSideBarState, this.getState);
		},
	}
});

export const useRightSideBarStore = defineStore('RightSideBarState', {
	state: (): { isOpen: boolean } => ({
		isOpen: LocalStorageUtil.get<boolean>(LocalStorageKeys.RightSideBarState) || false,
	}),
	getters: {
		isSideBarOpen: (state) => state.isOpen,
	},
	actions: {
		toggleSideBar(): void {
			this.isOpen = !this.isOpen;
			LocalStorageUtil.set(LocalStorageKeys.RightSideBarState, this.isOpen);
		},
		setOpen(isOpen: boolean): void {
			this.isOpen = isOpen;
			LocalStorageUtil.set(LocalStorageKeys.RightSideBarState, isOpen);
		},
	}
});

export const useNotesStore = defineStore('NotesState', {
	state: (): { notes: Note[] } => ({
		notes: LocalStorageUtil.get<Note[]>(LocalStorageKeys.Notes) || [],
	}),
	getters: {
		getNotes: (state) => state.notes,
	},
	actions: {
		setNotes(notes: Note[]): void {
			this.notes = notes;
			LocalStorageUtil.set(LocalStorageKeys.Notes, notes);
		},
	}
});

export const useSelectedDayStore = defineStore('SelectedDate', {
	state: (): { selectedDay: Moment } => ({
		selectedDay: moment(),
	}),
	getters: {
		getSelectedDay: (state) => state.selectedDay,
	},
	actions: {
		setSelectedDay(date: Moment): void {
			this.selectedDay = date;
		},
		previousDay(): void {
			if (this.selectedDay.isSame(moment().startOf('week'), 'date')) {
				this.selectedDay = moment().endOf('week');
			} else {
				this.selectedDay = this.selectedDay.clone().subtract(1, 'day');
			}
		},
		nextDay(): void {
			if (this.selectedDay.isSame(moment().endOf('week'), 'date')) {
				this.selectedDay = moment().startOf('week');
			} else {
				this.selectedDay = this.selectedDay.clone().add(1, 'day');
			}
		}
	}
});

export const useBiWeeklyTasksStore = defineStore('BiWeeklyTasks', {
	state: (): { biWeeklyTasks: BiWeeklyTasks } => {
		const biWeeklyTasks = LocalStorageUtil.get<BiWeeklyTasks>(LocalStorageKeys.BiWeeklyTasks);
		return { biWeeklyTasks: biWeeklyTasks || {} }
	},
	getters: {
		getBiWeeklyTasks: (state) => state.biWeeklyTasks,
		getWeeklyOverviewData(state): WeeklyOverviewData {
			const thisWeek = state.biWeeklyTasks?.thisWeek || [];
			const lastWeek = state.biWeeklyTasks?.lastWeek || [];

			return {
				thisWeek: Object.values(thisWeek || {})
					.map(tasksOfTheDay => tasksOfTheDay.filter(task => task.isCompleted === true).length || 0),
				lastWeek: Object.values(lastWeek || {})
					.map(tasksOfTheDay => tasksOfTheDay.filter(task => task.isCompleted === true).length || 0)
			};
		},
		getTaskForTheDayData(state): Task[] {
			const thisWeek = state.biWeeklyTasks?.thisWeek;
			const todayDate = useSelectedDayStore().getSelectedDay.format('YYYY/MM/DD');
			return thisWeek?.[todayDate] || [];
		},
		getTasksCountData(state): TaskCount {
			const allTasksForThisWeek = [
				...Object.values(state.biWeeklyTasks?.thisWeek || {}).flat()
			];

			let completedTasks = 0;
			let inProgressTasks = 0;

			for (const task of allTasksForThisWeek) {
				if (task.isFullyCompleted === PartialTaskStatus.VALUE || (task.subtasks?.length > 0 && task.isPartiallyCompleted())) inProgressTasks++;
				if (task.isCompleted === true) completedTasks++;
			}

			return {
				[TaskCountType.TO_DO]: allTasksForThisWeek.length - completedTasks,
				[TaskCountType.COMPLETED]: completedTasks,
				[TaskCountType.IN_PROGRESS]: inProgressTasks,
				[TaskCountType.THIS_WEEK_DAILY_TOTAL]: Object.values(state.biWeeklyTasks?.thisWeek || {}).map(tasksOfTheDay => tasksOfTheDay.length),
				[TaskCountType.LAST_WEEK_DAILY_TOTAL]: Object.values(state.biWeeklyTasks?.lastWeek || {}).map(tasksOfTheDay => tasksOfTheDay.length),
			};
		},
		getThisWeekDates(state): Moment[] {
			const thisWeek = state.biWeeklyTasks?.thisWeek;
			return Object.keys(thisWeek || {}).map((date) => moment(date, 'YYYY/MM/DD'));
		},
		getMinMaxDates(state): MinMaxDates {
			const dates = {
				lastWeek: Object.keys(state.biWeeklyTasks?.lastWeek || {}).sort(),
				thisWeek: Object.keys(state.biWeeklyTasks?.thisWeek || {}).sort(),
			};
			if (dates.thisWeek.length === 0 && dates.lastWeek.length === 0) {
				return {
					min: moment(), max: moment(),
					lastWeek: { min: moment(), max: moment() },
					thisWeek: { min: moment(), max: moment() }
				};
			}
			return {
				min: moment(dates.lastWeek[0], 'YYYY/MM/DD'),
				max: moment(dates.thisWeek[dates.thisWeek.length - 1], 'YYYY/MM/DD'),
				lastWeek: {
					min: moment(dates.lastWeek[0], 'YYYY/MM/DD'),
					max: moment(dates.lastWeek[dates.lastWeek.length - 1], 'YYYY/MM/DD'),
				},
				thisWeek: {
					min: moment(dates.thisWeek[0], 'YYYY/MM/DD'),
					max: moment(dates.thisWeek[dates.thisWeek.length - 1], 'YYYY/MM/DD'),
				},
			};
		}
	},
	actions: {
		setBiWeeklyTasks(biWeeklyTasks: BiWeeklyTasks): void {
			this.biWeeklyTasks = biWeeklyTasks;
			LocalStorageUtil.set(LocalStorageKeys.BiWeeklyTasks, biWeeklyTasks);
		},
		addNewTask(newTask: Task): void {
			const dateRange = this.getMinMaxDates;
			if (newTask.date.isSameOrAfter(dateRange.lastWeek.min) && newTask.date.isSameOrBefore(dateRange.lastWeek.max)) {
				if (this.biWeeklyTasks?.lastWeek) {
					this.biWeeklyTasks?.lastWeek[newTask.date.format('YYYY/MM/DD')].push(newTask);
				} else {
					this.biWeeklyTasks.lastWeek = { [newTask.date.format('YYYY/MM/DD')]: [newTask] };
				}
				// this.biWeeklyTasks.lastWeek = { ...this.biWeeklyTasks.lastWeek };
			} else if (newTask.date.isSameOrAfter(dateRange.thisWeek.min) && newTask.date.isSameOrBefore(dateRange.thisWeek.max)) {
				if (this.biWeeklyTasks?.thisWeek) {
					this.biWeeklyTasks?.thisWeek[newTask.date.format('YYYY/MM/DD')].push(newTask);
				} else {
					this.biWeeklyTasks.thisWeek = { [newTask.date.format('YYYY/MM/DD')]: [newTask] };
				}
				// this.biWeeklyTasks.thisWeek = { ...this.biWeeklyTasks.thisWeek };
			}
			this.biWeeklyTasks = { ...this.biWeeklyTasks };
			LocalStorageUtil.set(LocalStorageKeys.BiWeeklyTasks, this.biWeeklyTasks);
			notifyItem_TaskAdded(newTask);
		},
		deleteThisWeekTask(deleteTask: Task): void {
			const thisWeek = this.biWeeklyTasks?.thisWeek;
			const date = deleteTask.date.format('YYYY/MM/DD');
			if (thisWeek?.[date]) {
				thisWeek[date] = thisWeek[date].filter(oldTask => oldTask.id !== deleteTask.id);
				this.biWeeklyTasks = { ...this.biWeeklyTasks };
				LocalStorageUtil.set(LocalStorageKeys.BiWeeklyTasks, this.biWeeklyTasks);
				notifyItem_TaskDeleted();
			}
		},
		updateThisWeekTask(updatedTask: Task): void {
			const thisWeek = this.biWeeklyTasks?.thisWeek;
			const date = updatedTask.date.format('YYYY/MM/DD');
			console.log('date:', date);
			console.log('thisWeek[date]:', thisWeek?.[date]);
			if (thisWeek?.[date]) {
				thisWeek[date] = thisWeek[date].map(oldTask => oldTask.id === updatedTask.id ? updatedTask : oldTask);
				thisWeek[date] = [...thisWeek[date]];

				this.biWeeklyTasks = { ...this.biWeeklyTasks };
				LocalStorageUtil.set(LocalStorageKeys.BiWeeklyTasks, this.biWeeklyTasks);
				notifyItem_TaskUpdated();
			}
		}
	},
});

export const useTaskTagsStore = defineStore('TaskTags', {
	state: () => ({
		tags: LocalStorageUtil.get<TagNameType>(LocalStorageKeys.TaskTags) || TagNames,
		tagColorMap: LocalStorageUtil.get<TagColorMapType>(LocalStorageKeys.TaskTagColorMap) || TagColorMap,
	}),
	actions: {
		addTags(...tags: string[]): void {
			tags.forEach((tag) => {
				this.tags[tag] = tag;
				this.tagColorMap[tag] = getRandomTagColor();
			});

			this.tags = { ...this.tags };
			LocalStorageUtil.set(LocalStorageKeys.TaskTags, this.tags);

			this.tagColorMap = { ...this.tagColorMap };
			LocalStorageUtil.set(LocalStorageKeys.TaskTagColorMap, this.tagColorMap);
		}
	}
});

export const useNotificationItemsStore = defineStore('Notifications', {
	state: (): { notifications: NotificationItem[] } => ({
		notifications: LocalStorageUtil.get<NotificationItem[]>(LocalStorageKeys.Notifications) || [],
	}),
	actions: {
		addNotificationItem(notificationItem: NotificationItem): void {
			this.notifications.push(notificationItem);
			this.notifications = [...this.notifications];
			LocalStorageUtil.set(LocalStorageKeys.Notifications, this.notifications);
		},
		removeNotificationItem(notificationItem: NotificationItem): void {
			this.notifications = this.notifications.filter(n => n.id !== notificationItem.id);
			this.notifications = [...this.notifications];
			LocalStorageUtil.set(LocalStorageKeys.Notifications, this.notifications);
		}
	}
});

// Watch for changes in the biWeeklyTasks store
// useBiWeeklyTasksStore().$subscribe(
// 	(mutation, state) => {
// 		console.log('subscribe', mutation, state);
// 	}, {
// 	detached: false,
// });
