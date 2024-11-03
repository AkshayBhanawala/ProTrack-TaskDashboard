export const TagNames = {
	Donations: 'Donations',
	Social: 'Social',
	Sports: 'Sports',
	SelfCare: 'SelfCare',
	Shopping: 'Shopping',
	Volunteer: 'Volunteer',
	Animals: 'Animals',
	Reading: 'Reading',
	Literature: 'Literature',
	Cooking: 'Cooking',
	Events: 'Events',
	Wellness: 'Wellness',
	Work: 'Work',
	Productivity: 'Productivity',
	Fitness: 'Fitness',
	Environment: 'Environment',
	Sustainability: 'Sustainability',
	Organization: 'Organization',
	Home: 'Home',
	Learning: 'Learning',
	Entertainment: 'Entertainment',
	Goals: 'Goals',
	Creativity: 'Creativity',
	Hobbies: 'Hobbies',
	Fun: 'Fun',
	Languages: 'Languages',
	Community: 'Community',
	Fundraising: 'Fundraising',
	Education: 'Education',
	History: 'History',
	Family: 'Family',
	Heritage: 'Heritage',
	Food: 'Food',
	Travel: 'Travel',
	Adventure: 'Adventure',
	Art: 'Art',
	Culture: 'Culture',
	Finance: 'Finance',
	Planning: 'Planning',
	Reflection: 'Reflection',
	Mindfulness: 'Mindfulness',
	Skills: 'Skills',
	Networking: 'Networking',
	DIY: 'DIY',
	Inspiration: 'Inspiration',
	Exploration: 'Exploration',
	Writing: 'Writing',
	Nature: 'Nature',
	Music: 'Music',
	Career: 'Career',
	Dining: 'Dining',
	Friendship: 'Friendship',
	Leisure: 'Leisure',
	Memories: 'Memories',
	Photography: 'Photography',
	Health: 'Health',
	Media: 'Media',
	Tech: 'Tech',
	Relaxation: 'Relaxation',
	Gardening: 'Gardening',
	Growth: 'Growth',
	Outdoor: 'Outdoor',
	Holidays: 'Holidays',
	Preparation: 'Preparation',
	Business: 'Business',
	Innovation: 'Innovation'
};

export type TagNameType = typeof TagNames;

export enum TagColor {
	accent = 'accent',
	accent2 = 'accent2',
	secondary = 'secondary',
	tertiary = 'tertiary',
}

export function getRandomTagColor(): TagColor {
	return Object.values(TagColor)[Math.floor(Math.random() * Object.values(TagColor).length)];
}

export const TagColorMap: Partial<Record<keyof typeof TagNames, TagColor>> = {};
Object.keys(TagNames).forEach((tag) => TagColorMap[tag] = getRandomTagColor());

export type TagColorMapType = typeof TagColorMap;
