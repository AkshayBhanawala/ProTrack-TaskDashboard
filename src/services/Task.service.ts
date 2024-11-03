import axios from 'axios';
import moment from 'moment';

import { BaseTask, TagColorMap, Task } from '../models';

export const taskService = {
	async fetchTasks(): Promise<Task[]> {
		try {
			const response = await axios.get('/data/dashboard/tasks.json');
			const { tasks } = response.data;

			return tasks.map((task: any) => {
				const mappedTask = new Task(
					task.label,
					task.isCompleted,
					moment(task.date)
				);

				if (task.subtasks) {
					mappedTask.subtasks = task.subtasks.map((subtask: any) =>
						new BaseTask(
							subtask.label,
							subtask.isCompleted,
						)
					);
				}

				if (task.tags) {
					mappedTask.tags = task.tags.map((tagName: string) => TagColorMap[tagName]);
				}

				return mappedTask;
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);
			return [];
		}
	}
};
