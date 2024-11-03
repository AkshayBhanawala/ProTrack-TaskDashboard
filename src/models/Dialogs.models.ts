import { Task } from 'src/models';

export type TaskDialogProps = {
	taskOperation: 'ADD' | 'EDIT';
	editTask?: Task | null;
};
