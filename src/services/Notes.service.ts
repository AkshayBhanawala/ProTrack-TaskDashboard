import axios from 'axios';
import moment from 'moment';

import { Note } from '../models/Note.model';

export const notesService = {
	async fetchAllNotes(): Promise<Note[]> {
		try {
			const response = await axios.get('/data/dashboard/notes.json');
			const notes = response.data.notes;

			return notes.map((note: Note) => {
				const randomDays = Math.floor(Math.random() * 30);
				return new Note(
					note.title,
					note.content,
					moment().subtract(randomDays, 'days'),
					note.attachments || []
				);
			});
		} catch (error) {
			console.error('Error fetching notes:', error);
			return [];
		}
	}
};
