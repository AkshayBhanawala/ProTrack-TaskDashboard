<template>
	<main class="container">
		<q-splitter :horizontal="Screen.lt.md" v-model="mainSplitter" class="main-splitter" separator-style="opacity: 0">
			<template v-slot:before>
				<q-splitter horizontal v-model="leftSplitter" class="left-splitter" unit="px">
					<template v-slot:before>
						<div class="greetings">
							<p class="header3">Welcome Back!</p>
							<p class="header1">Akshay's Home</p>
						</div>
						<WeeklyOverviewCard class="q-mb-md" />
					</template>

					<template v-slot:after>
						<q-splitter v-if="Screen.lt.md" horizontal v-model="rightSplitter" class="right-splitter" unit="px">
							<template v-slot:before><CalendarSection /></template>
							<template v-slot:after><TaskForTheDaySection /></template>
						</q-splitter>
						<NotesSection v-else />
					</template>
				</q-splitter>
			</template>

			<template v-slot:after>
				<NotesSection v-if="Screen.lt.md" />
				<q-splitter v-else horizontal v-model="rightSplitter" class="right-splitter" unit="px">
					<template v-slot:before><CalendarSection /></template>
					<template v-slot:after><TaskForTheDaySection /></template>
				</q-splitter>
			</template>
		</q-splitter>
	</main>
</template>

<script setup lang="ts">
	import { EventBus, Screen } from 'quasar';
	import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';

	import CalendarSection from 'src/components/dashboard/CalendarSection.component.vue';
	import NotesSection from 'src/components/dashboard/NotesSection.component.vue';
	import TaskForTheDaySection from 'src/components/dashboard/TaskForTheDaySection.component.vue';
	import WeeklyOverviewCard from 'src/components/dashboard/WeeklyOverviewCard.component.vue';
	import { usePromiseLoading } from 'src/composables/useDataFetch.composable';
	import { getBiWeeklyTasks } from 'src/models/_MasterTasksList';
	import { resetPiniaStores } from 'src/stores';
	import { useBiWeeklyTasksStore, useGlobalSpinnerStore } from 'src/stores/store';
	import { LocalStorageUtil } from 'src/utils/localStorage.util';
	import { notifyItem_Welcome } from 'src/utils/notification-item.util';

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

	const mainSplitter = ref(60);
	const leftSplitter = ref(Infinity);
	const rightSplitter = ref(Infinity);

	const biWeeklyTaskStore = useBiWeeklyTasksStore();
	const biWeeklyTasks = computed(() => {
		return biWeeklyTaskStore.biWeeklyTasks;
	});

	const bus = inject<EventBus>('bus');

	onMounted(() => {
		if (!biWeeklyTasks.value?.lastWeek || !biWeeklyTasks.value?.thisWeek) {
			setNewData();
		}
		bus?.on('newData', () => {
			// location.reload();
			setNewData();
		});

		function setNewData() {
			LocalStorageUtil.clear();
			resetPiniaStores();

			const { loadingEvent, fetchData } = usePromiseLoading();
			const spinner = useGlobalSpinnerStore();
			loadingEvent?.on('change', (isLoading) => {
				spinner.setLoading(isLoading);
			});

			fetchData(getBiWeeklyTasks).then((biWeeklyTasks) => {
				if (biWeeklyTasks) {
					console.log('biWeeklyTasks:', biWeeklyTasks);
					biWeeklyTaskStore.setBiWeeklyTasks(biWeeklyTasks);
					notifyItem_Welcome();
				}
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

		.main-splitter,
		.left-splitter,
		.right-splitter {
			gap: 1vw;
		}

		.main-splitter,
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
