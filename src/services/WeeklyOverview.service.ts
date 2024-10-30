import axios from 'axios';

import { WeeklyOverviewSeries } from '../models/WeeklyOverview.model';

export const weeklyOverviewService = {
	async fetchWeeklyOverview(): Promise<WeeklyOverviewSeries> {
		try {
			const response = await axios.get('/data/dashboard/weekly-overview.json');
			return response.data;
		} catch (error) {
			console.error('Error fetching weekly overview:', error);
			throw error;
		}
	}
};
