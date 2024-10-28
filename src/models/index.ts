import { Moment } from 'moment';

export interface Attachment {
	fileName: string;
	thumbnail: string;
	src: string;
}

export class Note {
	label: string;
	description: string;
	date: Moment;
	attachments?: Attachment[];

	constructor(label: string, description: string, date: Moment, attachments: Attachment[] = []) {
		this.label = label;
		this.description = description;
		this.date = date;
		this.attachments = attachments?.length ? attachments : [];
	}
}
