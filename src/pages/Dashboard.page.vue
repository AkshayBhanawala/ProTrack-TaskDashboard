<template>
	<main class="container">
		<q-splitter v-model="mainSplitter" class="left-splitter" separator-style="opacity: 0">
			<template v-slot:before>
				<q-splitter horizontal v-model="leftSplitter" class="left-splitter" :limits="[65, 480]" unit="px">
					<template v-slot:before>
						<div class="greetings">
							<p class="header3">Welcome Back!</p>
							<p class="header1">Akshay's Home</p>
						</div>
						<WeeklyOverviewCard class="q-mb-md" />
					</template>

					<template v-slot:after>
						<NotesSection />
					</template>
				</q-splitter>
			</template>

			<template v-slot:after>
				<q-splitter horizontal v-model="rightSplitter" class="right-splitter" :limits="[0, 380]" unit="px">
					<template v-slot:before>
						<CalendarSection />
					</template>

					<template v-slot:after>
						<TaskForTheDaySection />
					</template>
				</q-splitter>
			</template>
		</q-splitter>
	</main>
</template>

<script setup lang="ts">
	import { EventBus } from 'quasar';
	import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';

	import CalendarSection from '@/components/dashboard/CalendarSection.component.vue';
	import NotesSection from '@/components/dashboard/NotesSection.component.vue';
	import TaskForTheDaySection from '@/components/dashboard/TaskForTheDaySection.component.vue';
	import WeeklyOverviewCard from '@/components/dashboard/WeeklyOverviewCard.component.vue';
	import { getBiWeeklyTasks } from '@/models/_MasterTasksList';
	import { useBiWeeklyTasksStore } from '@/stores/store';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	defineOptions({
		name: 'DashboardPage',
		components: {
			WeeklyOverviewCard,
			NotesSection,
			CalendarSection,
			TaskForTheDaySection,
		},
	});

	withDefaults(defineProps<Props>(), {});

	const mainSplitter = ref(50);
	const leftSplitter = ref(480);
	const rightSplitter = ref(380);

	const biWeeklyTaskStore = useBiWeeklyTasksStore();
	const biWeeklyTasks = computed(() => {
		return biWeeklyTaskStore.biWeeklyTasks;
	});

	const bus = inject<EventBus>('bus');

	onMounted(() => {
		if (!biWeeklyTasks.value?.lastWeek || !biWeeklyTasks.value?.thisWeek) {
			setNewData();
		}
		console.log('biWeeklyTasks:', biWeeklyTasks.value);
		bus?.on('newData', () => {
			setNewData();
		});

		function setNewData() {
			getBiWeeklyTasks().then((biWeeklyTasks) => {
				biWeeklyTaskStore.setBiWeeklyTasks(biWeeklyTasks);
			});
		}
	});

	onBeforeUnmount(() => {
		bus?.off('newData');
	});
</script>

<style scoped lang="scss">
	main {
		padding: 15px 25px;
		row-gap: 15px;
		column-gap: 25px;

		.left-splitter,
		.right-splitter {
			gap: 1vw;
		}

		.left-splitter {
			:deep() {
				.q-splitter__before {
					flex-direction: column;
				}
			}
		}

		.right-splitter {
			:deep() {
				.q-splitter__separator::after {
					z-index: -10;
					position: absolute;
					display: block;
					content: '';
					width: 100%;
					height: 20px;
					top: 1px;
					background: #fbfbfb;
				}
			}
		}

		:deep() {
			.q-splitter__before,
			.q-splitter__after {
				display: flex;
				gap: 15px;
				overflow: visible;
				max-height: max-content;
				background: $background;
			}
		}

		.greetings {
			P {
				margin: 0;
			}
		}
	}
</style>
