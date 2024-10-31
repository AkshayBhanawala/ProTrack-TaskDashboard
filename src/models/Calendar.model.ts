export enum TaskCountType {
	TO_DO = 'TO_DO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	THIS_WEEK_DAILY_TOTAL = 'THIS_WEEK_DAILY_TOTAL',
	LAST_WEEK_DAILY_TOTAL = 'LAST_WEEK_DAILY_TOTAL',
}

export type TaskCountTypeColor = {
	[key in TaskCountType]: string;
};

export type TaskCountTypeLabel = TaskCountTypeColor;

export const taskCountTypeColorMap: TaskCountTypeColor = Object.freeze({
	[TaskCountType.TO_DO]: 'primary',
	[TaskCountType.IN_PROGRESS]: 'secondary',
	[TaskCountType.COMPLETED]: 'accent',
	[TaskCountType.THIS_WEEK_DAILY_TOTAL]: '',
	[TaskCountType.LAST_WEEK_DAILY_TOTAL]: '',
});

export const taskCountTypeLabelMap: TaskCountTypeLabel = Object.freeze({
	[TaskCountType.TO_DO]: 'To-Do',
	[TaskCountType.IN_PROGRESS]: 'In-Progress',
	[TaskCountType.COMPLETED]: 'Completed',
	[TaskCountType.THIS_WEEK_DAILY_TOTAL]: 'This Week Daily Total',
	[TaskCountType.LAST_WEEK_DAILY_TOTAL]: 'Last Week Daily Total',
});

export type TaskCount = {
	[TaskCountType.TO_DO]: number;
	[TaskCountType.COMPLETED]: number;
	[TaskCountType.IN_PROGRESS]: number;
	[TaskCountType.THIS_WEEK_DAILY_TOTAL]: number[];
	[TaskCountType.LAST_WEEK_DAILY_TOTAL]: number[];
};

export type CalendarData = {
	tasksCount: TaskCount;
};

export type DailyTotal = {
	[TaskCountType.THIS_WEEK_DAILY_TOTAL]: number[],
	[TaskCountType.LAST_WEEK_DAILY_TOTAL]: number[]
};
