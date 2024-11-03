<template>
	<q-card class="calendar-section">
		<q-card-section vertical class="row justify-between items-center q-pt-lg">
			<span class="header2 title">Calendar</span>
			<div class="header-actions group">
				<q-btn outline dense rounded icon="sym_r_arrow_back_ios_new" class="color-secondary previous-btn" @click="selectedDayStore.previousDay()">
					<ToolTip text="Previous Day" />
				</q-btn>
				<q-btn outline dense rounded icon="sym_r_arrow_forward_ios" class="color-secondary next-btn" @click="selectedDayStore.nextDay()">
					<ToolTip text="Next Day" />
				</q-btn>
			</div>
		</q-card-section>
		<q-card-section horizontal class="calendar-date-cards">
			<q-btn
				v-for="date in dates"
				:key="date.format('YYYY/MM/DD')"
				:class="{
					active: selectedDayStore.getSelectedDay.isSame(date, 'date'),
					today: isToday(date),
				}"
				class="calendar-date-card"
				@click="selectedDayStore.setSelectedDay(date)"
			>
				<!-- <ToolTip v-if="isToday(date)" text="Today" /> -->
				<ToolTip :text="date.format('DD &nbsp; MMM &nbsp; YYYY')" anchor="top middle" self="bottom middle" />
				<div class="date-day">
					<span class="date">{{ date.format('DD') }}</span>
					<span class="day">{{ date.format('ddd') }}</span>
				</div>
			</q-btn>
		</q-card-section>
		<q-card-section horizontal class="task-count-cards">
			<q-card v-for="(v, k, index) in tasksCount" :key="index" :color="taskCountTypeColorMap[k]" class="tasks-count-card" outline>
				<div class="task-count">
					<span class="label">{{ taskCountTypeLabelMap[k] }}</span>
					<span class="count">{{ v?.toString()?.length === 1 ? `0${v}` : v }}</span>
				</div>
			</q-card>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
	import moment, { Moment } from 'moment';
	import { computed } from 'vue';

	import ToolTip from 'src/components/ToolTip.component.vue';
	import { useBiWeeklyTasksStore, useSelectedDayStore } from 'src/stores/store';
	import { TaskCount, TaskCountType, taskCountTypeColorMap, taskCountTypeLabelMap } from 'src/models';

	const byWeeklyTasksStore = useBiWeeklyTasksStore();
	const selectedDayStore = useSelectedDayStore();

	const dates = computed(() => byWeeklyTasksStore.getThisWeekDates);
	const tasksCount = computed((): Partial<TaskCount> => {
		const typeOfCountsToShow = [TaskCountType.TO_DO, TaskCountType.COMPLETED, TaskCountType.IN_PROGRESS];
		const counts: Partial<TaskCount> = {};
		Object.keys(byWeeklyTasksStore.getTasksCountData).forEach((taskCountType) => {
			if (typeOfCountsToShow.includes(taskCountType as TaskCountType)) {
				counts[taskCountType] = byWeeklyTasksStore.getTasksCountData[taskCountType as TaskCountType];
			}
		});
		return counts;
	});

	function isToday(date: Moment) {
		return date.isSame(moment(), 'date');
	}
</script>

<style scoped lang="scss">
	.calendar-section {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		border: none;
		box-shadow: none;
		background-color: transparent;

		.title {
			font-size: 28px;
			font-weight: 500;
		}

		.header-actions {
			&,
			> .group {
				display: flex;
				gap: 15px;
				margin-left: auto;
			}

			&.group,
			> .group {
				gap: 7.5px;
			}

			.previous-btn,
			.next-btn {
				width: 36px;
				height: 36px;
				border-radius: 10px;
			}
		}

		.calendar-date-cards {
			gap: 16px;
			padding: 16px;
			padding-bottom: 20px;
			justify-content: space-between;

			.calendar-date-card {
				flex-basis: 100%;
				flex-grow: 1;
				min-width: 36px;
				width: 50px;
				max-width: 100px;
				padding: 0;
				padding-top: 15px;
				border: 1px solid $separator-color;
				border-radius: 10px;
				overflow: hidden;
				box-shadow: rgba(0, 0, 0, 0.04) 0px 30px 30px -5px, rgba($separator-color, 0.5) 0px 20px 20px -5px;
				transition: 0.3s ease-in-out;

				&:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 15px;
					border: none;
					border-radius: 0;
					box-shadow: none;
					background-color: rgba($tertiary, 0.5);
				}

				.date-day {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 5px;
					line-height: 1;
					padding: 5px 10px 10px 10px;
					color: $text;

					.date {
						font-size: 20px;
						font-weight: 700;
					}

					.day {
						font-size: 14px;
						font-weight: 400;
					}
				}

				&.active {
					transform: scale(1.3);
					box-shadow: rgba(0, 0, 0, 0.08) 0px 30px 30px -5px, rgba($separator-color, 1) 0px 20px 20px -5px;

					&:before {
						background-color: rgba($tertiary, 1);
					}
				}

				&.today {
					background-color: $tertiary;
					border: 1px solid $tertiary;
					box-shadow: rgba(0, 0, 0, 0.04) 0px 30px 30px -5px, rgba($tertiary, 0.25) 0px 20px 20px -5px;

					&.active {
						box-shadow: rgba(0, 0, 0, 0.04) 0px 30px 30px -5px, rgba($tertiary, 0.35) 0px 20px 20px -5px;
					}

					&:before {
						background-color: white;
					}

					&:after {
						content: 'Today';
						position: absolute;
						top: 3px;
						left: 50%;
						transform: translateX(-50%);
						font-size: 10px;
						line-height: 1;
						font-weight: 700;
					}

					.date-day {
						color: white;
					}
				}
			}
		}

		.task-count-cards {
			gap: 16px;
			padding: 2vh 16px 20px 16px;
			justify-content: space-between;
			pointer-events: none;

			.tasks-count-card {
				flex-grow: 1;
				flex-basis: 100%;
				border: 1px solid $separator-color;
				border-radius: 15px;
				overflow: hidden;
				transition: transform 0.3s ease-in-out;
				word-break: break-word;

				&[color='primary'] {
					background-color: rgba($primary, 0.1);
					border-color: rgba($primary, 1);
					color: $primary;
					opacity: 0.8;
				}

				&[color='secondary'] {
					background-color: rgba($secondary, 0.1);
					border-color: rgba($secondary, 1);
					color: $secondary;
					opacity: 0.8;
				}

				&[color='accent'] {
					background-color: rgba($accent, 0.1);
					border-color: rgba($accent, 1);
					color: $accent;
					opacity: 0.8;
				}

				&[color='tertiary'] {
					background-color: rgba($tertiary, 0.1);
					border-color: rgba($tertiary, 1);
					color: $tertiary;
					opacity: 0.8;
				}

				.task-count {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 15px;
					line-height: 1;
					padding: 20px 15px;

					.label {
						font-size: 24px;
						font-weight: 700;
					}

					.count {
						padding-left: 10px;
						font-size: 35px;
						font-weight: 900;
					}
				}
			}
		}
	}
</style>
