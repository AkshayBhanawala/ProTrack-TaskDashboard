<template>
	<main class="container">
		<q-splitter v-model="mainSplitter" class="left-splitter" separator-style="opacity: 0">
			<template v-slot:before>
				<q-splitter horizontal v-model="leftSplitter" class="left-splitter" style="height: calc(100vh - 100px)" :limits="[65, 480]" unit="px">
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
				<q-splitter horizontal v-model="rightSplitter" class="right-splitter" style="height: calc(100vh - 100px)" :limits="[0, 380]" unit="px">
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
	import CalendarSection from 'src/components/dashboard/CalendarSection.vue';
	import NotesSection from 'src/components/dashboard/NotesSection.vue';
	import TaskForTheDaySection from 'src/components/dashboard/TaskForTheDaySection.vue';
	import WeeklyOverviewCard from 'src/components/dashboard/WeeklyOverviewCard.vue';
	import { ref } from 'vue';

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
