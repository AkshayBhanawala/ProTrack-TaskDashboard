import moment, { Moment } from 'moment';
import { v4 as uuid_v4 } from 'uuid';

export enum PartialTaskStatus {
	VALUE = 'PARTIAL',
}

export type TaskStatus = boolean | PartialTaskStatus.VALUE;

export interface ITask<AllowedStatus = TaskStatus, DateType = Moment> {
	id?: string;
	label: string;
	isCompleted: AllowedStatus;
	date?: DateType;
	subtasks?: Pick<ITask<boolean, DateType>, 'label' | 'isCompleted' | 'date'>[];
	tags?: string[];
}

export type ITaskInput = ITask<TaskStatus, string>;

export class BaseTask<AllowedStatus extends TaskStatus = TaskStatus> implements ITask<AllowedStatus> {
	label: string;
	isCompleted: AllowedStatus;

	constructor(label: string, isCompleted: AllowedStatus) {
		this.label = label;
		this.isCompleted = isCompleted ?? false;
	}
}

export class Subtask extends BaseTask<boolean> { }

export class Task extends BaseTask implements ITask {
	id: string;
	date: Moment;
	subtasks: Subtask[];
	tags?: string[] | undefined;

	constructor(label: string, isCompleted: TaskStatus, date?: Moment, subtasks: Subtask[] = [], tags: string[] = []) {
		super(label, isCompleted);
		this.id = uuid_v4();
		this.date = date ?? moment();
		this.subtasks = subtasks?.length ? subtasks : [];
		this.tags = tags?.length ? tags : [];
	}

	get isFullyCompleted(): TaskStatus {
		return this.checkCompleted();
	}

	set isFullyCompleted(value: boolean) {
		this.isCompleted = value;
		this.subtasks.forEach((subtask) => {
			subtask.isCompleted = value;
		});
	}

	checkCompleted(): TaskStatus {
		if (!this.subtasks?.length) {
			this.isCompleted = this.isCompleted;
			return this.isCompleted;
		}
		const states = new Set(this.subtasks.map((subtask) => subtask.isCompleted));
		if (states.size > 1) {
			this.isCompleted = PartialTaskStatus.VALUE;
		} else {
			this.isCompleted = Array.from(states)[0] || false;
		}
		return this.isCompleted;
	}

	isPartiallyCompleted(): boolean {
		if (this.subtasks?.length) {
			return false;
		}
		return new Set(this.subtasks.map((subtask) => subtask.isCompleted)).size > 1;
	}
}

export interface IBiWeeklyTasks {
	lastWeek?: { [key: string]: ITask<TaskStatus>[] };
	thisWeek?: { [key: string]: ITask<TaskStatus>[] };
}

export interface BiWeeklyTasks {
	lastWeek?: { [key: string]: Task[] };
	thisWeek?: { [key: string]: Task[] };
}
