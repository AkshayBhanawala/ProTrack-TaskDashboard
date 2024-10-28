<template>
	<q-card class="calendar-section">
		<q-card-section vertical class="row justify-between items-center q-pt-lg">
			<span class="header2 title">Calendar</span>
			<q-btn outline dense rounded icon="sym_r_arrow_forward_ios" class="color-secondary next-btn">
				<ToolTip text="Next Week" />
			</q-btn>
		</q-card-section>
		<q-card-section horizontal class="calendar-date-cards">
			<q-btn
				v-for="date in dates"
				:key="date.format('YYYY-MM-DD')"
				:class="{ today: isCurrentDate(date) }"
				class="calendar-date-card"
				outline
				color="tertiary"
			>
				<div class="date-day">
					<span class="date">{{ date.format('DD') }}</span>
					<span class="day">{{ date.format('ddd') }}</span>
				</div>
			</q-btn>
		</q-card-section>
		<q-card-section horizontal class="note-cards">
			<q-card v-for="(v, k, index) in getTasksCountData()" :key="index" :color="v.color" class="tasks-count-card" outline>
				<div class="task-count">
					<span class="label">{{ v.label }}</span>
					<span class="count">{{ v.count.toString().length === 1 ? `0${v.count}` : v.count }}</span>
				</div>
			</q-card>
		</q-card-section>
	</q-card>
</template>
<script setup lang="ts">
	import moment, { Moment } from 'moment';
	import { QCardSection } from 'quasar';
	import { ref } from 'vue';
	import ToolTip from '../ToolTip.vue';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	defineOptions({
		name: 'CalendarSection',
		components: {
			ToolTip,
		},
	});

	withDefaults(defineProps<Props>(), {});

	const dates = ref<Moment[]>(getCurrentWeekDates());

	function getCurrentWeekDates() {
		const currentWeek = moment().week();
		const startOfWeek = moment().week(currentWeek).startOf('isoWeek');
		const endOfWeek = moment().week(currentWeek).endOf('isoWeek');
		return Array.from({ length: endOfWeek.diff(startOfWeek, 'days') + 1 }, (_, i) => startOfWeek.clone().add(i, 'days'));
	}

	function isCurrentDate(date: Moment) {
		return date.isSame(moment(), 'day');
	}

	function getTasksCountData() {
		return {
			toDo: { label: 'To Do', count: 20, color: 'primary' },
			inProgress: { label: 'In-Progress', count: 15, color: 'secondary' },
			completed: { label: 'Completed', count: 3, color: 'accent' },
		};
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

		.next-btn {
			width: 36px;
			height: 36px;
			border-radius: 10px;
		}

		.calendar-date-cards {
			gap: 16px;
			padding: 16px;
			padding-bottom: 20px;
			justify-content: space-between;

			.calendar-date-card {
				flex-grow: 1;
				min-width: 36px;
				width: 50px;
				max-width: 60px;
				padding: 0;
				padding-top: 15px;
				border: 1px solid $separator-color;
				border-radius: 10px;
				overflow: hidden;
				box-shadow: rgba(0, 0, 0, 0.04) 0px 30px 30px -5px, rgba(230, 228, 240, 0.5) 0px 20px 20px -5px;
				transition: transform 0.3s ease-in-out;

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

				&.today {
					pointer-events: none;
					transform: scale(1.3);
					&:before {
						background-color: rgba($tertiary, 1);
					}
				}
			}
		}

		.note-cards {
			gap: 16px;
			padding: 40px 16px 20px 16px;
			justify-content: space-between;

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
