import { Task } from '@/models';

export type TaskDialogProps = {
	taskOperation: 'ADD' | 'EDIT';
	editTask?: Task | null;
};
