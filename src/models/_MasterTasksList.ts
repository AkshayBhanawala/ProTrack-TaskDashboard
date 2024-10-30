import moment from 'moment';

import { ITask, Task, BiWeeklyTasks } from './Task.model';
import { TagName } from './TaskTag.model';

export function getBiWeeklyTasks(): Promise<BiWeeklyTasks> {
	const lastWeekStart = moment().subtract(1, 'week').startOf('week');
	const thisWeekStart = moment().startOf('week');
	return new Promise<BiWeeklyTasks>((resolve) => {
		setTimeout(() => {
			resolve({
				lastWeek: generateWeek(lastWeekStart),
				thisWeek: generateWeek(thisWeekStart)
			});
		}, 0);
	})

	function getRandomTasks(date: moment.Moment): Task[] {
		const numTasks = Math.floor(Math.random() * 8); // 0 to 7 tasks
		const shuffledTasks = [...masterTasksList].sort(() => Math.random() - 0.5);

		return shuffledTasks
			.slice(0, numTasks)
			.map(task => new Task(
				task.label,
				Math.random() > 0.5,
				date.clone(),
				task.subtasks?.map(subtask => ({
					...subtask,
					isCompleted: Math.random() > 0.5
				}))
			));
	};

	function generateWeek(startDate: moment.Moment): { [key: string]: Task[] } {
		const weekTasks: { [key: string]: Task[] } = {};

		Array.from({ length: 7 }).forEach((_, index) => {
			const date = startDate.clone().add(index, 'days');
			const dateKey = date.format('YYYY-MM-DD');
			weekTasks[dateKey] = getRandomTasks(date);
		});

		return weekTasks;
	};
}

const masterTasksList: ITask[] = [
	{
		label: 'Donate Rs. 1000 to the charity',
		isCompleted: true,
		subtasks: [
			{
				label: 'Donate Rs. 500 to the charity',
				isCompleted: true,
			},
			{
				label: 'Donate Rs. 500 to the charity',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Donations,
			TagName.Social
		]
	},
	{
		label: 'Do 500 pushups',
		isCompleted: false,
		subtasks: [
			{
				label: 'Start with 100',
				isCompleted: true,
			},
			{
				label: 'Complete 200',
				isCompleted: true,
			},
			{
				label: 'Reach 400',
				isCompleted: false,
			},
			{
				label: 'Complete 500',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Sports,
			TagName.SelfCare
		]
	},
	{
		label: 'Buy new headset',
		isCompleted: true,
		tags: [
			TagName.Shopping
		]
	},
	{
		label: 'Clean the room',
		isCompleted: false,
		tags: [
			TagName.SelfCare
		]
	},
	{
		label: 'Volunteer at the animal shelter',
		isCompleted: true,
		subtasks: [
			{
				label: 'Attend orientation',
				isCompleted: true,
			},
			{
				label: 'Assist with feeding',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Volunteer,
			TagName.Animals
		]
	},
	{
		label: "Read 'The Great Gatsby'",
		isCompleted: false,
		subtasks: [
			{
				label: 'Read first chapter',
				isCompleted: true,
			},
			{
				label: 'Read last chapter',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Reading,
			TagName.Literature
		]
	},
	{
		label: 'Bake a cake for the party',
		isCompleted: true,
		subtasks: [
			{
				label: 'Gather ingredients',
				isCompleted: true,
			},
			{
				label: 'Bake the cake',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Cooking,
			TagName.Events
		]
	},
	{
		label: 'Meditate for 20 minutes',
		isCompleted: false,
		tags: [
			TagName.Wellness,
			TagName.SelfCare
		]
	},
	{
		label: 'Finish the project report',
		isCompleted: true,
		subtasks: [
			{
				label: 'Collect data',
				isCompleted: true,
			},
			{
				label: 'Write introduction',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Work,
			TagName.Productivity
		]
	},
	{
		label: 'Join a yoga class',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.SelfCare
		]
	},
	{
		label: 'Plant a tree',
		isCompleted: true,
		tags: [
			TagName.Environment,
			TagName.Sustainability
		]
	},
	{
		label: 'Organize the bookshelf',
		isCompleted: false,
		tags: [
			TagName.Organization,
			TagName.Home
		]
	},
	{
		label: 'Watch a documentary',
		isCompleted: true,
		tags: [
			TagName.Learning,
			TagName.Entertainment
		]
	},
	{
		label: 'Make a vision board',
		isCompleted: false,
		tags: [
			TagName.Goals,
			TagName.Creativity
		]
	},
	{
		label: 'Attend a cooking class',
		isCompleted: true,
		tags: [
			TagName.Learning,
			TagName.Cooking
		]
	},
	{
		label: 'Complete a puzzle',
		isCompleted: false,
		tags: [
			TagName.Hobbies,
			TagName.Fun
		]
	},
	{
		label: 'Write a blog post',
		isCompleted: true,
		subtasks: [
			{
				label: 'Draft outline',
				isCompleted: true,
			},
			{
				label: 'Edit draft',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Writing,
			TagName.Creativity
		]
	},
	{
		label: 'Learn a new language',
		isCompleted: false,
		subtasks: [
			{
				label: 'Download app',
				isCompleted: true,
			},
			{
				label: 'Complete first lesson',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Learning,
			TagName.Languages
		]
	},
	{
		label: 'Go for a nature walk',
		isCompleted: true,
		tags: [
			TagName.Fitness,
			TagName.Nature
		]
	},
	{
		label: 'Start a journal',
		isCompleted: false,
		tags: [
			TagName.SelfCare,
			TagName.Writing
		]
	},
	{
		label: 'Watch a foreign film',
		isCompleted: true,
		tags: [
			TagName.Entertainment,
			TagName.Culture
		]
	},
	{
		label: 'Plan a weekend getaway',
		isCompleted: false,
		subtasks: [
			{
				label: 'Choose a destination',
				isCompleted: false,
			},
			{
				label: 'Book accommodations',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Travel,
			TagName.Planning
		]
	},
	{
		label: 'Practice guitar for an hour',
		isCompleted: true,
		tags: [
			TagName.Music,
			TagName.Hobbies
		]
	},
	{
		label: 'Update resume',
		isCompleted: false,
		tags: [
			TagName.Career,
			TagName.Productivity
		]
	},
	{
		label: 'Try a new restaurant',
		isCompleted: true,
		tags: [
			TagName.Food,
			TagName.Dining
		]
	},
	{
		label: 'Clean out the garage',
		isCompleted: false,
		tags: [
			TagName.Organization,
			TagName.Home
		]
	},
	{
		label: 'Go to a concert',
		isCompleted: true,
		tags: [
			TagName.Music,
			TagName.Entertainment
		]
	},
	{
		label: 'Create a budget plan',
		isCompleted: false,
		tags: [
			TagName.Finance,
			TagName.Planning
		]
	},
	{
		label: 'Attend a local festival',
		isCompleted: true,
		tags: [
			TagName.Community,
			TagName.Events
		]
	},
	{
		label: 'Host a game night',
		isCompleted: false,
		tags: [
			TagName.Social,
			TagName.Fun
		]
	},
	{
		label: 'Write a letter to a friend',
		isCompleted: true,
		tags: [
			TagName.Writing,
			TagName.Friendship
		]
	},
	{
		label: 'Take a scenic drive',
		isCompleted: false,
		tags: [
			TagName.Travel,
			TagName.Leisure
		]
	},
	{
		label: 'Declutter the closet',
		isCompleted: true,
		tags: [
			TagName.Organization,
			TagName.Home
		]
	},
	{
		label: 'Practice meditation',
		isCompleted: false,
		tags: [
			TagName.Wellness,
			TagName.SelfCare
		]
	},
	{
		label: 'Visit a museum',
		isCompleted: true,
		tags: [
			TagName.Culture,
			TagName.Education
		]
	},
	{
		label: 'Plan a surprise party',
		isCompleted: false,
		subtasks: [
			{
				label: 'Choose a date',
				isCompleted: false,
			},
			{
				label: 'Create a guest list',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Events,
			TagName.Planning
		]
	},
	{
		label: 'Go hiking this weekend',
		isCompleted: true,
		tags: [
			TagName.Fitness,
			TagName.Nature
		]
	},
	{
		label: 'Create a photo album',
		isCompleted: false,
		tags: [
			TagName.Creativity,
			TagName.Memories
		]
	},
	{
		label: 'Attend a book club meeting',
		isCompleted: true,
		tags: [
			TagName.Reading,
			TagName.Social
		]
	},
	{
		label: 'Learn to cook a new recipe',
		isCompleted: false,
		tags: [
			TagName.Cooking,
			TagName.Learning
		]
	},
	{
		label: 'Sign up for a marathon',
		isCompleted: true,
		tags: [
			TagName.Fitness,
			TagName.Goals
		]
	},
	{
		label: 'Explore a new hobby',
		isCompleted: false,
		tags: [
			TagName.Hobbies,
			TagName.Creativity
		]
	},
	{
		label: 'Take a photography walk',
		isCompleted: false,
		tags: [
			TagName.Photography,
			TagName.Nature
		]
	},
	{
		label: 'Create a self-care routine',
		isCompleted: true,
		tags: [
			TagName.SelfCare,
			TagName.Wellness
		]
	},
	{
		label: 'Join a local sports league',
		isCompleted: false,
		tags: [
			TagName.Sports,
			TagName.Community
		]
	},
	{
		label: 'Host a potluck dinner',
		isCompleted: true,
		subtasks: [
			{
				label: 'Send invites',
				isCompleted: true,
			},
			{
				label: 'Prepare a dish',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Social,
			TagName.Cooking
		]
	},
	{
		label: 'Learn about a new culture',
		isCompleted: false,
		tags: [
			TagName.Education,
			TagName.Culture
		]
	},
	{
		label: 'Participate in a community clean-up',
		isCompleted: true,
		tags: [
			TagName.Volunteer,
			TagName.Environment
		]
	},
	{
		label: 'Create a scrapbook',
		isCompleted: false,
		tags: [
			TagName.Creativity,
			TagName.Memories
		]
	},
	{
		label: 'Watch the sunrise',
		isCompleted: true,
		tags: [
			TagName.Nature,
			TagName.Mindfulness
		]
	},
	{
		label: 'Try a new workout',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.Health
		]
	},
	{
		label: 'Attend a pottery class',
		isCompleted: true,
		tags: [
			TagName.Art,
			TagName.Learning
		]
	},
	{
		label: 'Create a podcast episode',
		isCompleted: false,
		subtasks: [
			{
				label: 'Research topic',
				isCompleted: false,
			},
			{
				label: 'Record audio',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Media,
			TagName.Creativity
		]
	},
	{
		label: 'Plan a family game night',
		isCompleted: true,
		tags: [
			TagName.Family,
			TagName.Fun
		]
	},
	{
		label: 'Explore a new city',
		isCompleted: false,
		tags: [
			TagName.Travel,
			TagName.Adventure
		]
	},
	{
		label: 'Create a personal website',
		isCompleted: true,
		subtasks: [
			{
				label: 'Choose a platform',
				isCompleted: true,
			},
			{
				label: 'Design layout',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Career,
			TagName.Tech
		]
	},
	{
		label: 'Go stargazing',
		isCompleted: false,
		tags: [
			TagName.Nature,
			TagName.Relaxation
		]
	},
	{
		label: 'Take a day trip to the beach',
		isCompleted: true,
		tags: [
			TagName.Travel,
			TagName.Leisure
		]
	},
	{
		label: 'Write a poem',
		isCompleted: false,
		tags: [
			TagName.Writing,
			TagName.Creativity
		]
	},
	{
		label: "Visit a farmer's market",
		isCompleted: true,
		tags: [
			TagName.Food,
			TagName.Community
		]
	},
	{
		label: 'Join a dance class',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.Social
		]
	},
	{
		label: 'Create a bucket list',
		isCompleted: true,
		tags: [
			TagName.Goals,
			TagName.Planning
		]
	},
	{
		label: 'Write a letter to your future self',
		isCompleted: false,
		tags: [
			TagName.Writing,
			TagName.Reflection
		]
	},
	{
		label: 'Attend a music festival',
		isCompleted: true,
		tags: [
			TagName.Music,
			TagName.Events
		]
	},
	{
		label: 'Start a vegetable garden',
		isCompleted: false,
		tags: [
			TagName.Gardening,
			TagName.Food
		]
	},
	{
		label: 'Create a wellness plan',
		isCompleted: true,
		tags: [
			TagName.Health,
			TagName.SelfCare
		]
	},
	{
		label: 'Explore local history',
		isCompleted: false,
		tags: [
			TagName.Learning,
			TagName.Culture
		]
	},
	{
		label: 'Go for a bike ride',
		isCompleted: true,
		tags: [
			TagName.Fitness,
			TagName.Leisure
		]
	},
	{
		label: 'Create a family recipe book',
		isCompleted: false,
		tags: [
			TagName.Cooking,
			TagName.Family
		]
	},
	{
		label: 'Volunteer for a local charity',
		isCompleted: true,
		tags: [
			TagName.Volunteer,
			TagName.Community
		]
	},
	{
		label: 'Attend a lecture or seminar',
		isCompleted: false,
		tags: [
			TagName.Education,
			TagName.Learning
		]
	},
	{
		label: 'Go on a photography expedition',
		isCompleted: true,
		tags: [
			TagName.Photography,
			TagName.Adventure
		]
	},
	{
		label: 'Join a book exchange',
		isCompleted: false,
		tags: [
			TagName.Reading,
			TagName.Social
		]
	},
	{
		label: 'Practice mindfulness daily',
		isCompleted: true,
		tags: [
			TagName.Wellness,
			TagName.SelfCare
		]
	},
	{
		label: 'Create a home workout plan',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.Health
		]
	},
	{
		label: 'Host a movie marathon',
		isCompleted: false,
		tags: [
			TagName.Entertainment,
			TagName.Social
		]
	},
	{
		label: 'Take a cooking challenge',
		isCompleted: true,
		tags: [
			TagName.Cooking,
			TagName.Fun
		]
	},
	{
		label: 'Complete a DIY project',
		isCompleted: false,
		subtasks: [
			{
				label: 'Gather materials',
				isCompleted: false,
			},
			{
				label: 'Follow instructions',
				isCompleted: false,
			}
		],
		tags: [
			TagName.DIY,
			TagName.Creativity
		]
	},
	{
		label: 'Join a public speaking group',
		isCompleted: true,
		tags: [
			TagName.Skills,
			TagName.Networking
		]
	},
	{
		label: 'Create a morning routine',
		isCompleted: false,
		tags: [
			TagName.SelfCare,
			TagName.Productivity
		]
	},
	{
		label: 'Plan a themed dinner night',
		isCompleted: true,
		tags: [
			TagName.Cooking,
			TagName.Social
		]
	},
	{
		label: 'Watch a TED talk',
		isCompleted: false,
		tags: [
			TagName.Learning,
			TagName.Inspiration
		]
	},
	{
		label: 'Take a day to unplug from technology',
		isCompleted: true,
		tags: [
			TagName.Mindfulness,
			TagName.SelfCare
		]
	},
	{
		label: 'Explore local hiking trails',
		isCompleted: false,
		tags: [
			TagName.Nature,
			TagName.Fitness
		]
	},
	{
		label: 'Create a personal manifesto',
		isCompleted: true,
		tags: [
			TagName.Reflection,
			TagName.Goals
		]
	},
	{
		label: 'Try a new sport',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.Fun
		]
	},
	{
		label: 'Start a gratitude journal',
		isCompleted: true,
		tags: [
			TagName.SelfCare,
			TagName.Reflection
		]
	},
	{
		label: 'Plan a charity fundraiser',
		isCompleted: false,
		tags: [
			TagName.Community,
			TagName.Fundraising
		]
	},
	{
		label: 'Learn about a historical event',
		isCompleted: true,
		tags: [
			TagName.Education,
			TagName.History
		]
	},
	{
		label: 'Create a family tree',
		isCompleted: false,
		tags: [
			TagName.Family,
			TagName.Heritage
		]
	},
	{
		label: 'Visit a local coffee shop',
		isCompleted: true,
		tags: [
			TagName.Food,
			TagName.Social
		]
	},
	{
		label: 'Plan a road trip',
		isCompleted: false,
		tags: [
			TagName.Travel,
			TagName.Adventure
		]
	},
	{
		label: 'Take a class on a new skill',
		isCompleted: true,
		tags: [
			TagName.Learning,
			TagName.Growth
		]
	},
	{
		label: 'Go to a local art exhibit',
		isCompleted: false,
		tags: [
			TagName.Art,
			TagName.Culture
		]
	},
	{
		label: 'Start a savings plan',
		isCompleted: true,
		tags: [
			TagName.Finance,
			TagName.Planning
		]
	},
	{
		label: 'Write a short story',
		isCompleted: false,
		tags: [
			TagName.Writing,
			TagName.Creativity
		]
	},
	{
		label: 'Plan a family picnic',
		isCompleted: true,
		tags: [
			TagName.Family,
			TagName.Outdoor
		]
	},
	{
		label: 'Go to a sports game',
		isCompleted: false,
		tags: [
			TagName.Sports,
			TagName.Entertainment
		]
	},
	{
		label: 'Create a vision for the year',
		isCompleted: true,
		tags: [
			TagName.Goals,
			TagName.Planning
		]
	},
	{
		label: 'Practice a new dance routine',
		isCompleted: false,
		tags: [
			TagName.Fitness,
			TagName.Fun
		]
	},
	{
		label: 'Visit a national park',
		isCompleted: true,
		tags: [
			TagName.Nature,
			TagName.Travel
		]
	},
	{
		label: 'Try out a new hobby',
		isCompleted: false,
		tags: [
			TagName.Hobbies,
			TagName.Exploration
		]
	},
	{
		label: 'Go to a comedy show',
		isCompleted: true,
		tags: [
			TagName.Entertainment,
			TagName.Fun
		]
	},
	{
		label: 'Organize a community event',
		isCompleted: false,
		subtasks: [
			{
				label: 'Choose a theme',
				isCompleted: false,
			},
			{
				label: 'Book a venue',
				isCompleted: false,
			},
			{
				label: 'Promote the event',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Community,
			TagName.Events
		]
	},
	{
		label: 'Create a daily exercise routine',
		isCompleted: false,
		subtasks: [
			{
				label: 'Set exercise goals',
				isCompleted: false,
			},
			{
				label: 'Choose activities',
				isCompleted: false,
			},
			{
				label: 'Track progress',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Fitness,
			TagName.Health
		]
	},
	{
		label: 'Plan a holiday gift list',
		isCompleted: true,
		subtasks: [
			{
				label: 'Make a list of recipients',
				isCompleted: true,
			},
			{
				label: 'Brainstorm gift ideas',
				isCompleted: true,
			},
			{
				label: 'Set a budget',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Planning,
			TagName.Holidays
		]
	},
	{
		label: 'Launch a blog',
		isCompleted: false,
		subtasks: [
			{
				label: 'Choose a niche',
				isCompleted: false,
			},
			{
				label: 'Select a blogging platform',
				isCompleted: false,
			},
			{
				label: 'Write the first post',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Writing,
			TagName.Creativity
		]
	},
	{
		label: 'Prepare for a job interview',
		isCompleted: false,
		subtasks: [
			{
				label: 'Research the company',
				isCompleted: false,
			},
			{
				label: 'Practice common questions',
				isCompleted: false,
			},
			{
				label: 'Choose an outfit',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Career,
			TagName.Preparation
		]
	},
	{
		label: 'Host a trivia night',
		isCompleted: true,
		subtasks: [
			{
				label: 'Create trivia questions',
				isCompleted: true,
			},
			{
				label: 'Invite friends',
				isCompleted: true,
			},
			{
				label: 'Prepare snacks',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Social,
			TagName.Fun
		]
	},
	{
		label: 'Create a monthly budget',
		isCompleted: false,
		subtasks: [
			{
				label: 'List income sources',
				isCompleted: false,
			},
			{
				label: 'Identify expenses',
				isCompleted: false,
			},
			{
				label: 'Adjust spending as needed',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Finance,
			TagName.Planning
		]
	},
	{
		label: 'Build a reading list for the year',
		isCompleted: false,
		subtasks: [
			{
				label: 'Research book recommendations',
				isCompleted: false,
			},
			{
				label: 'Categorize by genre',
				isCompleted: false,
			},
			{
				label: 'Set reading goals',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Reading,
			TagName.Goals
		]
	},
	{
		label: 'Plan a family vacation',
		isCompleted: true,
		subtasks: [
			{
				label: 'Choose a destination',
				isCompleted: true,
			},
			{
				label: 'Book transportation',
				isCompleted: true,
			},
			{
				label: 'Create an itinerary',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Travel,
			TagName.Family
		]
	},
	{
		label: 'Create a self-improvement plan',
		isCompleted: false,
		subtasks: [
			{
				label: 'Identify areas to improve',
				isCompleted: false,
			},
			{
				label: 'Set specific goals',
				isCompleted: false,
			},
			{
				label: 'Track progress regularly',
				isCompleted: false,
			}
		],
		tags: [
			TagName.SelfCare,
			TagName.Goals
		]
	},
	{
		label: 'Start a fitness challenge with friends',
		isCompleted: false,
		subtasks: [
			{
				label: 'Set a start date',
				isCompleted: false,
			},
			{
				label: 'Choose activities',
				isCompleted: false,
			},
			{
				label: 'Create a group chat for motivation',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Fitness,
			TagName.Social
		]
	},
	{
		label: 'Plan a themed costume party',
		isCompleted: true,
		subtasks: [
			{
				label: 'Decide on a theme',
				isCompleted: true,
			},
			{
				label: 'Send invitations',
				isCompleted: true,
			},
			{
				label: 'Prepare decorations',
				isCompleted: true,
			}
		],
		tags: [
			TagName.Social,
			TagName.Events
		]
	},
	{
		label: 'Launch a new product idea',
		isCompleted: false,
		subtasks: [
			{
				label: 'Conduct market research',
				isCompleted: false,
			},
			{
				label: 'Create a prototype',
				isCompleted: false,
			},
			{
				label: 'Develop a marketing plan',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Business,
			TagName.Innovation
		]
	},
	{
		label: 'Create a digital art piece',
		isCompleted: false,
		subtasks: [
			{
				label: 'Choose a concept',
				isCompleted: false,
			},
			{
				label: 'Gather reference images',
				isCompleted: false,
			},
			{
				label: 'Complete the artwork',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Art,
			TagName.Creativity
		]
	},
	{
		label: 'Organize a charity run',
		isCompleted: false,
		subtasks: [
			{
				label: 'Determine the cause',
				isCompleted: false,
			},
			{
				label: 'Find sponsors',
				isCompleted: false,
			},
			{
				label: 'Promote the event',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Community,
			TagName.Health
		]
	},
	{
		label: 'Write a business plan',
		isCompleted: false,
		subtasks: [
			{
				label: 'Research the industry',
				isCompleted: false,
			},
			{
				label: 'Define target market',
				isCompleted: false,
			},
			{
				label: 'Outline financial projections',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Business,
			TagName.Planning
		]
	},
	{
		label: 'Conduct a home energy audit',
		isCompleted: false,
		subtasks: [
			{
				label: 'Check insulation levels',
				isCompleted: false,
			},
			{
				label: 'Inspect windows and doors',
				isCompleted: false,
			},
			{
				label: 'Review energy bills',
				isCompleted: false,
			}
		],
		tags: [
			TagName.Home,
			TagName.Environment
		]
	}
];
