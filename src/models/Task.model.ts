import { Moment } from 'moment';

import { Tag, TagName } from './TaskTag.model';

export enum PartialTaskStatus {
	VALUE = 'PARTIAL',
}

export type TaskStatus = boolean | PartialTaskStatus.VALUE;

export interface ITask<AllowedStatus = TaskStatus> {
	label: string;
	isCompleted: AllowedStatus;
	date?: Moment;
	subtasks?: Pick<ITask, 'label' | 'isCompleted' | 'date'>[];
	tags?: TagName[];
}

export class BaseTask<AllowedStatus extends TaskStatus = TaskStatus> implements ITask<AllowedStatus> {
	label: string;
	isCompleted: AllowedStatus;
	date?: Moment;
	// inProgress: boolean;
	// dateAdded: Moment;
	// dateCompleted?: Moment;

	constructor(label: string, isCompleted: AllowedStatus, date?: Moment) {
		this.label = label;
		this.isCompleted = isCompleted;
		this.date = date;
		// this.inProgress = inProgress;
		// this.dateAdded = dateAdded;
		// this.dateCompleted = dateCompleted;
	}
}

export type Subtask = BaseTask<boolean>;

export class Task extends BaseTask {
	subtasks: Subtask[];
	tags: Tag[];

	constructor(label: string, isCompleted: boolean, date?: Moment, subtasks: Subtask[] = [], tags: Tag[] = []) {
		super(label, isCompleted, date);
		this.subtasks = subtasks?.length ? subtasks : [];
		this.tags = tags?.length ? tags : [];
	}

	getDates() {
		return this.subtasks.map((subtask) => subtask.date);
	}

	get isFullyCompleted(): TaskStatus {
		if (!this.subtasks?.length) {
			return this.isCompleted;
		}
		const states = new Set(this.subtasks.map((subtask) => subtask.isCompleted));
		if (states.size > 1) {
			return PartialTaskStatus.VALUE;
		} else {
			return Array.from(states)[0] || false;
		}
	}

	set isFullyCompleted(value: boolean) {
		this.isCompleted = value;
		this.subtasks.forEach((subtask) => {
			subtask.isCompleted = value;
		});
	}

	isPartiallyCompleted() {
		if (this.subtasks?.length) {
			return false;
		}
		return new Set(this.subtasks.map((subtask) => subtask.isCompleted)).size > 1;
	}
}

export interface BiWeeklyTasks {
	lastWeek: { [key: string]: Task[] };
	thisWeek: { [key: string]: Task[] };
}
