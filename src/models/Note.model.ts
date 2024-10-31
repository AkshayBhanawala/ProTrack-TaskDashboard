import { Moment } from 'moment';

export interface Attachment {
	fileName: string;
	thumbnail: string;
	src: string;
}
export interface INote {
	title: string;
	content: string;
	date?: Moment | string;
	attachments?: Attachment[];
}

export class Note {
	title: string;
	content: string;
	date: Moment;
	attachments?: Attachment[];

	constructor(title: string, content: string, date: Moment, attachments: Attachment[] = []) {
		this.title = title;
		this.content = content;
		this.date = date;
		this.attachments = attachments?.length ? attachments : [];
	}
}
