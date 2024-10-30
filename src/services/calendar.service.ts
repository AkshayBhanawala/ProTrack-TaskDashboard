import axios from 'axios';
import moment, { Moment } from 'moment';

import { CalendarData } from '../models';

export const calendarService = {
	async fetchCalendarData(): Promise<CalendarData> {
		try {
			const response = await axios.get('/data/dashboard/calendar.json');
			return response.data;
		} catch (error) {
			console.error('Error fetching calendar data:', error);
			throw error;
		}
	},

	getWeekDates(): Moment[] {
		const dates: Moment[] = [];
		const startOfWeek = moment().startOf('week').add(1, 'days'); // Start from Monday

		for (let i = 0; i < 6; i++) {
			dates.push(moment(startOfWeek).add(i, 'days'));
		}

		return dates;
	}
};
