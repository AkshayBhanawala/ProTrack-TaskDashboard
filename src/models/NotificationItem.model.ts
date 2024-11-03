import { v4 as uuid_v4 } from 'uuid';

export interface INotificationItem {
	id: string;
	title?: string;
	subtext?: string;
	avatar?: string;
	icon?: string;
	color?: string;
}

export class NotificationItem implements INotificationItem {
	id: string;
	title?: string;
	subtext?: string;
	avatar?: string;
	icon?: string;
	color?: string;

	constructor(title?: string, subtext?: string, avatar?: string, icon?: string, color?: string) {
		this.id = uuid_v4();
		this.title = title;
		this.subtext = subtext;
		this.icon = icon;
		this.avatar = avatar;
		this.color = color;
	}
}
