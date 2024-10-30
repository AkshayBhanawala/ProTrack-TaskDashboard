export interface TaskCount {
	label: string;
	count: number;
	color: string;
}

export interface CalendarData {
	tasksCount: {
		[key: string]: TaskCount;
	};
}
