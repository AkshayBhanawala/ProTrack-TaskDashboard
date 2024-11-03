import moment from 'moment';

import { ITask, Task, BiWeeklyTasks, Subtask } from './Task.model';
import { TagNames } from './TaskTag.model';

export function getBiWeeklyTasks(): Promise<BiWeeklyTasks> {
	const lastWeekStart = moment().subtract(1, 'week').startOf('week');
	const thisWeekStart = moment().startOf('week');
	return new Promise<BiWeeklyTasks>((resolve) => {
		setTimeout(() => {
			resolve({
				lastWeek: generateWeek(lastWeekStart),
				thisWeek: generateWeek(thisWeekStart)
			});
		}, 2000);
	});

	function generateWeek(startDate: moment.Moment): { [key: string]: Task[] } {
		const weekTasks: { [key: string]: Task[] } = {};

		Array.from({ length: 7 }).forEach((_, index) => {
			// if (index === 0) return;
			const date = startDate.clone().add(index, 'days');
			const dateKey = date.format('YYYY/MM/DD');
			weekTasks[dateKey] = getRandomTasks(date);
		});

		return weekTasks;
	};
}

function getRandomTasks(date: moment.Moment): Task[] {
	const numTasks = Math.floor(Math.random() * 5) + 3; // 3 to 13 tasks
	const shuffledTasks = [...masterTasksList].sort(() => Math.random() - 0.5);
	const isFutureDate = date.isAfter(moment(), 'date');
	return shuffledTasks
		.slice(0, numTasks)
		.map(task => new Task(
			task.label,
			isFutureDate ? false : Math.random() > 0.5,
			date.clone(),
			task.subtasks?.map(subtask => new Subtask(subtask.label, isFutureDate ? false : Math.random() > 0.5)),
			task.tags
		));
};

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
			TagNames.Donations,
			TagNames.Social
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
			TagNames.Sports,
			TagNames.SelfCare
		]
	},
	{
		label: 'Buy new headset',
		isCompleted: true,
		tags: [
			TagNames.Shopping
		]
	},
	{
		label: 'Clean the room',
		isCompleted: false,
		tags: [
			TagNames.SelfCare
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
			TagNames.Volunteer,
			TagNames.Animals
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
			TagNames.Reading,
			TagNames.Literature
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
			TagNames.Cooking,
			TagNames.Events
		]
	},
	{
		label: 'Meditate for 20 minutes',
		isCompleted: false,
		tags: [
			TagNames.Wellness,
			TagNames.SelfCare
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
			TagNames.Work,
			TagNames.Productivity
		]
	},
	{
		label: 'Join a yoga class',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.SelfCare
		]
	},
	{
		label: 'Plant a tree',
		isCompleted: true,
		tags: [
			TagNames.Environment,
			TagNames.Sustainability
		]
	},
	{
		label: 'Organize the bookshelf',
		isCompleted: false,
		tags: [
			TagNames.Organization,
			TagNames.Home
		]
	},
	{
		label: 'Watch a documentary',
		isCompleted: true,
		tags: [
			TagNames.Learning,
			TagNames.Entertainment
		]
	},
	{
		label: 'Make a vision board',
		isCompleted: false,
		tags: [
			TagNames.Goals,
			TagNames.Creativity
		]
	},
	{
		label: 'Attend a cooking class',
		isCompleted: true,
		tags: [
			TagNames.Learning,
			TagNames.Cooking
		]
	},
	{
		label: 'Complete a puzzle',
		isCompleted: false,
		tags: [
			TagNames.Hobbies,
			TagNames.Fun
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
			TagNames.Writing,
			TagNames.Creativity
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
			TagNames.Learning,
			TagNames.Languages
		]
	},
	{
		label: 'Go for a nature walk',
		isCompleted: true,
		tags: [
			TagNames.Fitness,
			TagNames.Nature
		]
	},
	{
		label: 'Start a journal',
		isCompleted: false,
		tags: [
			TagNames.SelfCare,
			TagNames.Writing
		]
	},
	{
		label: 'Watch a foreign film',
		isCompleted: true,
		tags: [
			TagNames.Entertainment,
			TagNames.Culture
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
			TagNames.Travel,
			TagNames.Planning
		]
	},
	{
		label: 'Practice guitar for an hour',
		isCompleted: true,
		tags: [
			TagNames.Music,
			TagNames.Hobbies
		]
	},
	{
		label: 'Update resume',
		isCompleted: false,
		tags: [
			TagNames.Career,
			TagNames.Productivity
		]
	},
	{
		label: 'Try a new restaurant',
		isCompleted: true,
		tags: [
			TagNames.Food,
			TagNames.Dining
		]
	},
	{
		label: 'Clean out the garage',
		isCompleted: false,
		tags: [
			TagNames.Organization,
			TagNames.Home
		]
	},
	{
		label: 'Go to a concert',
		isCompleted: true,
		tags: [
			TagNames.Music,
			TagNames.Entertainment
		]
	},
	{
		label: 'Create a budget plan',
		isCompleted: false,
		tags: [
			TagNames.Finance,
			TagNames.Planning
		]
	},
	{
		label: 'Attend a local festival',
		isCompleted: true,
		tags: [
			TagNames.Community,
			TagNames.Events
		]
	},
	{
		label: 'Host a game night',
		isCompleted: false,
		tags: [
			TagNames.Social,
			TagNames.Fun
		]
	},
	{
		label: 'Write a letter to a friend',
		isCompleted: true,
		tags: [
			TagNames.Writing,
			TagNames.Friendship
		]
	},
	{
		label: 'Take a scenic drive',
		isCompleted: false,
		tags: [
			TagNames.Travel,
			TagNames.Leisure
		]
	},
	{
		label: 'Declutter the closet',
		isCompleted: true,
		tags: [
			TagNames.Organization,
			TagNames.Home
		]
	},
	{
		label: 'Practice meditation',
		isCompleted: false,
		tags: [
			TagNames.Wellness,
			TagNames.SelfCare
		]
	},
	{
		label: 'Visit a museum',
		isCompleted: true,
		tags: [
			TagNames.Culture,
			TagNames.Education
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
			TagNames.Events,
			TagNames.Planning
		]
	},
	{
		label: 'Go hiking this weekend',
		isCompleted: true,
		tags: [
			TagNames.Fitness,
			TagNames.Nature
		]
	},
	{
		label: 'Create a photo album',
		isCompleted: false,
		tags: [
			TagNames.Creativity,
			TagNames.Memories
		]
	},
	{
		label: 'Attend a book club meeting',
		isCompleted: true,
		tags: [
			TagNames.Reading,
			TagNames.Social
		]
	},
	{
		label: 'Learn to cook a new recipe',
		isCompleted: false,
		tags: [
			TagNames.Cooking,
			TagNames.Learning
		]
	},
	{
		label: 'Sign up for a marathon',
		isCompleted: true,
		tags: [
			TagNames.Fitness,
			TagNames.Goals
		]
	},
	{
		label: 'Explore a new hobby',
		isCompleted: false,
		tags: [
			TagNames.Hobbies,
			TagNames.Creativity
		]
	},
	{
		label: 'Take a photography walk',
		isCompleted: false,
		tags: [
			TagNames.Photography,
			TagNames.Nature
		]
	},
	{
		label: 'Create a self-care routine',
		isCompleted: true,
		tags: [
			TagNames.SelfCare,
			TagNames.Wellness
		]
	},
	{
		label: 'Join a local sports league',
		isCompleted: false,
		tags: [
			TagNames.Sports,
			TagNames.Community
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
			TagNames.Social,
			TagNames.Cooking
		]
	},
	{
		label: 'Learn about a new culture',
		isCompleted: false,
		tags: [
			TagNames.Education,
			TagNames.Culture
		]
	},
	{
		label: 'Participate in a community clean-up',
		isCompleted: true,
		tags: [
			TagNames.Volunteer,
			TagNames.Environment
		]
	},
	{
		label: 'Create a scrapbook',
		isCompleted: false,
		tags: [
			TagNames.Creativity,
			TagNames.Memories
		]
	},
	{
		label: 'Watch the sunrise',
		isCompleted: true,
		tags: [
			TagNames.Nature,
			TagNames.Mindfulness
		]
	},
	{
		label: 'Try a new workout',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.Health
		]
	},
	{
		label: 'Attend a pottery class',
		isCompleted: true,
		tags: [
			TagNames.Art,
			TagNames.Learning
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
			TagNames.Media,
			TagNames.Creativity
		]
	},
	{
		label: 'Plan a family game night',
		isCompleted: true,
		tags: [
			TagNames.Family,
			TagNames.Fun
		]
	},
	{
		label: 'Explore a new city',
		isCompleted: false,
		tags: [
			TagNames.Travel,
			TagNames.Adventure
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
			TagNames.Career,
			TagNames.Tech
		]
	},
	{
		label: 'Go stargazing',
		isCompleted: false,
		tags: [
			TagNames.Nature,
			TagNames.Relaxation
		]
	},
	{
		label: 'Take a day trip to the beach',
		isCompleted: true,
		tags: [
			TagNames.Travel,
			TagNames.Leisure
		]
	},
	{
		label: 'Write a poem',
		isCompleted: false,
		tags: [
			TagNames.Writing,
			TagNames.Creativity
		]
	},
	{
		label: "Visit a farmer's market",
		isCompleted: true,
		tags: [
			TagNames.Food,
			TagNames.Community
		]
	},
	{
		label: 'Join a dance class',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.Social
		]
	},
	{
		label: 'Create a bucket list',
		isCompleted: true,
		tags: [
			TagNames.Goals,
			TagNames.Planning
		]
	},
	{
		label: 'Write a letter to your future self',
		isCompleted: false,
		tags: [
			TagNames.Writing,
			TagNames.Reflection
		]
	},
	{
		label: 'Attend a music festival',
		isCompleted: true,
		tags: [
			TagNames.Music,
			TagNames.Events
		]
	},
	{
		label: 'Start a vegetable garden',
		isCompleted: false,
		tags: [
			TagNames.Gardening,
			TagNames.Food
		]
	},
	{
		label: 'Create a wellness plan',
		isCompleted: true,
		tags: [
			TagNames.Health,
			TagNames.SelfCare
		]
	},
	{
		label: 'Explore local history',
		isCompleted: false,
		tags: [
			TagNames.Learning,
			TagNames.Culture
		]
	},
	{
		label: 'Go for a bike ride',
		isCompleted: true,
		tags: [
			TagNames.Fitness,
			TagNames.Leisure
		]
	},
	{
		label: 'Create a family recipe book',
		isCompleted: false,
		tags: [
			TagNames.Cooking,
			TagNames.Family
		]
	},
	{
		label: 'Volunteer for a local charity',
		isCompleted: true,
		tags: [
			TagNames.Volunteer,
			TagNames.Community
		]
	},
	{
		label: 'Attend a lecture or seminar',
		isCompleted: false,
		tags: [
			TagNames.Education,
			TagNames.Learning
		]
	},
	{
		label: 'Go on a photography expedition',
		isCompleted: true,
		tags: [
			TagNames.Photography,
			TagNames.Adventure
		]
	},
	{
		label: 'Join a book exchange',
		isCompleted: false,
		tags: [
			TagNames.Reading,
			TagNames.Social
		]
	},
	{
		label: 'Practice mindfulness daily',
		isCompleted: true,
		tags: [
			TagNames.Wellness,
			TagNames.SelfCare
		]
	},
	{
		label: 'Create a home workout plan',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.Health
		]
	},
	{
		label: 'Host a movie marathon',
		isCompleted: false,
		tags: [
			TagNames.Entertainment,
			TagNames.Social
		]
	},
	{
		label: 'Take a cooking challenge',
		isCompleted: true,
		tags: [
			TagNames.Cooking,
			TagNames.Fun
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
			TagNames.DIY,
			TagNames.Creativity
		]
	},
	{
		label: 'Join a public speaking group',
		isCompleted: true,
		tags: [
			TagNames.Skills,
			TagNames.Networking
		]
	},
	{
		label: 'Create a morning routine',
		isCompleted: false,
		tags: [
			TagNames.SelfCare,
			TagNames.Productivity
		]
	},
	{
		label: 'Plan a themed dinner night',
		isCompleted: true,
		tags: [
			TagNames.Cooking,
			TagNames.Social
		]
	},
	{
		label: 'Watch a TED talk',
		isCompleted: false,
		tags: [
			TagNames.Learning,
			TagNames.Inspiration
		]
	},
	{
		label: 'Take a day to unplug from technology',
		isCompleted: true,
		tags: [
			TagNames.Mindfulness,
			TagNames.SelfCare
		]
	},
	{
		label: 'Explore local hiking trails',
		isCompleted: false,
		tags: [
			TagNames.Nature,
			TagNames.Fitness
		]
	},
	{
		label: 'Create a personal manifesto',
		isCompleted: true,
		tags: [
			TagNames.Reflection,
			TagNames.Goals
		]
	},
	{
		label: 'Try a new sport',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.Fun
		]
	},
	{
		label: 'Start a gratitude journal',
		isCompleted: true,
		tags: [
			TagNames.SelfCare,
			TagNames.Reflection
		]
	},
	{
		label: 'Plan a charity fundraiser',
		isCompleted: false,
		tags: [
			TagNames.Community,
			TagNames.Fundraising
		]
	},
	{
		label: 'Learn about a historical event',
		isCompleted: true,
		tags: [
			TagNames.Education,
			TagNames.History
		]
	},
	{
		label: 'Create a family tree',
		isCompleted: false,
		tags: [
			TagNames.Family,
			TagNames.Heritage
		]
	},
	{
		label: 'Visit a local coffee shop',
		isCompleted: true,
		tags: [
			TagNames.Food,
			TagNames.Social
		]
	},
	{
		label: 'Plan a road trip',
		isCompleted: false,
		tags: [
			TagNames.Travel,
			TagNames.Adventure
		]
	},
	{
		label: 'Take a class on a new skill',
		isCompleted: true,
		tags: [
			TagNames.Learning,
			TagNames.Growth
		]
	},
	{
		label: 'Go to a local art exhibit',
		isCompleted: false,
		tags: [
			TagNames.Art,
			TagNames.Culture
		]
	},
	{
		label: 'Start a savings plan',
		isCompleted: true,
		tags: [
			TagNames.Finance,
			TagNames.Planning
		]
	},
	{
		label: 'Write a short story',
		isCompleted: false,
		tags: [
			TagNames.Writing,
			TagNames.Creativity
		]
	},
	{
		label: 'Plan a family picnic',
		isCompleted: true,
		tags: [
			TagNames.Family,
			TagNames.Outdoor
		]
	},
	{
		label: 'Go to a sports game',
		isCompleted: false,
		tags: [
			TagNames.Sports,
			TagNames.Entertainment
		]
	},
	{
		label: 'Create a vision for the year',
		isCompleted: true,
		tags: [
			TagNames.Goals,
			TagNames.Planning
		]
	},
	{
		label: 'Practice a new dance routine',
		isCompleted: false,
		tags: [
			TagNames.Fitness,
			TagNames.Fun
		]
	},
	{
		label: 'Visit a national park',
		isCompleted: true,
		tags: [
			TagNames.Nature,
			TagNames.Travel
		]
	},
	{
		label: 'Try out a new hobby',
		isCompleted: false,
		tags: [
			TagNames.Hobbies,
			TagNames.Exploration
		]
	},
	{
		label: 'Go to a comedy show',
		isCompleted: true,
		tags: [
			TagNames.Entertainment,
			TagNames.Fun
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
			TagNames.Community,
			TagNames.Events
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
			TagNames.Fitness,
			TagNames.Health
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
			TagNames.Planning,
			TagNames.Holidays
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
			TagNames.Writing,
			TagNames.Creativity
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
			TagNames.Career,
			TagNames.Preparation
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
			TagNames.Social,
			TagNames.Fun
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
			TagNames.Finance,
			TagNames.Planning
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
			TagNames.Reading,
			TagNames.Goals
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
			TagNames.Travel,
			TagNames.Family
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
			TagNames.SelfCare,
			TagNames.Goals
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
			TagNames.Fitness,
			TagNames.Social
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
			TagNames.Social,
			TagNames.Events
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
			TagNames.Business,
			TagNames.Innovation
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
			TagNames.Art,
			TagNames.Creativity
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
			TagNames.Community,
			TagNames.Health
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
			TagNames.Business,
			TagNames.Planning
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
			TagNames.Home,
			TagNames.Environment
		]
	}
];
