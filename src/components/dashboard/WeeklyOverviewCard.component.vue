<template>
	<q-card class="calendar-section">
		<q-card-section vertical class="row justify-between items-center q-pb-none">
			<span class="title">Weekly Overview</span>
			<q-btn outline dense rounded icon="sym_r_bar_chart" class="color-tertiary border-separator graph-change-btn">
				<ToolTip text="Bar Graph" />
			</q-btn>
		</q-card-section>

		<q-card-section horizontal class="full-height">
			<q-card-section class="stats">
				<span class="completed">
					<span class="count">{{ thisWeekCompletedCount }}</span>
					<span class="change small text-bold">
						<span v-if="changePercent >= 0" class="positive">
							<q-icon class="arrow" name="sym_r_arrow_drop_up" />
							<span>+{{ changePercent }}%</span>
						</span>
						<span v-else class="negative">
							<q-icon class="arrow" name="sym_r_arrow_drop_down" />
							<span>{{ changePercent }}%</span>
						</span>
					</span>
				</span>

				<div class="text-subtext">
					<span>Tasks Completed</span>
				</div>

				<div class="change-status text-bold q-mt-sm">
					<span v-if="changePercent >= 0" class="positive">
						<q-icon class="icon" name="sym_r_check_circle" />
						<span>On track</span>
					</span>
					<span v-else class="negative">
						<q-icon class="icon" name="sym_r_run_circle" />
						<span>Falling Behind</span>
					</span>
				</div>

				<div class="q-mt-md actions">
					<q-btn outline class="btn" icon="sym_r_menu_book" label="Open Tasks" />
				</div>
			</q-card-section>

			<q-card-section class="graph" ref="graphRef">
				<span v-if="graphBorderStyle" class="border" :style="graphBorderStyle"></span>
				<apexchart
					ref="apexChartRef"
					:width="chartOptions?.chart?.width ?? '100%'"
					:height="chartOptions?.chart?.height ?? '100%'"
					:options="chartOptions"
					:series="chartSeries"
				/>
				<span class="week-days">
					<span v-for="i in chartOptions?.xaxis?.categories" :key="i">
						{{ i }}
					</span>
				</span>
			</q-card-section>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
	import { ApexOptions } from 'apexcharts';
	import { QCardSection } from 'quasar';
	import { computed, ref, useTemplateRef } from 'vue';
	import { VueApexChartsComponent } from 'vue3-apexcharts';

	import ToolTip from '@/components/ToolTip.component.vue';
	import { DailyTotal, TaskCountType } from '@/models';
	import { ApexChartEvents, ChartSeries, ChartOptions, WeeklyOverviewData, ChartData } from '@/models/WeeklyOverview.model';
	import { useBiWeeklyTasksStore } from '@/stores/store';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	defineOptions({
		name: 'WeeklyOverviewCard',
		components: {
			ToolTip,
		},
	});

	withDefaults(defineProps<Props>(), {});

	const graphRef = useTemplateRef<QCardSection>('graphRef');
	const apexChartRef = useTemplateRef<VueApexChartsComponent>('apexChartRef');
	const graphBorderStyle = ref({});
	const chartOptions = ref<ApexOptions>();
	const biWeeklyTasksStore = useBiWeeklyTasksStore();

	const chartEvents: ApexChartEvents = {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mounted: function (chartContext, config: ApexOptions) {
			// console.log('mounted:', chartContext, config);
			updateGraphBorderStyle(chartContext);
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updated: function (chartContext, config: ApexOptions) {
			// console.log('updated:', chartContext, config);
			updateGraphBorderStyle(chartContext);
		},
	};
	chartOptions.value = ChartOptions.line(chartEvents);

	const totalTaskCounts = computed((): DailyTotal => {
		return {
			[TaskCountType.THIS_WEEK_DAILY_TOTAL]: biWeeklyTasksStore.getTasksCountData[TaskCountType.THIS_WEEK_DAILY_TOTAL],
			[TaskCountType.LAST_WEEK_DAILY_TOTAL]: biWeeklyTasksStore.getTasksCountData[TaskCountType.LAST_WEEK_DAILY_TOTAL],
		};
	});

	const weeklyOverviewData = computed((): WeeklyOverviewData => {
		return biWeeklyTasksStore.getWeeklyOverviewData;
	});

	const chartSeries = computed((): ChartSeries[] => {
		const charSeries = getWeeklyOverviewSeries(weeklyOverviewData.value);
		console.log('charSeries', charSeries);
		updateChartOptions(charSeries);
		// apexChartRef.value?.updateSeries(series);
		return charSeries;
	});

	const thisWeekCompletedCount = computed((): number => {
		const todayDay = new Date().getDay() - 1;
		let thisWeekCompletedCount = 0;
		for (let i = 0; i <= todayDay; i++) {
			thisWeekCompletedCount += weeklyOverviewData.value.thisWeek[i];
		}
		return thisWeekCompletedCount;
	});

	const changePercent = computed((): number => {
		if (!(weeklyOverviewData?.value?.lastWeek?.length && weeklyOverviewData?.value?.thisWeek?.length)) {
			return 0;
		}
		const thisWeekCounts = countsTillThisWeekDay(totalTaskCounts.value[TaskCountType.THIS_WEEK_DAILY_TOTAL], weeklyOverviewData.value.thisWeek);
		const lastWeekCounts = countsTillThisWeekDay(totalTaskCounts.value[TaskCountType.LAST_WEEK_DAILY_TOTAL], weeklyOverviewData.value.lastWeek);

		const lastWeekCompletePercent = getCompletePercent(lastWeekCounts);
		const thisWeekCompletePercent = getCompletePercent(thisWeekCounts);

		return Number((((thisWeekCompletePercent - lastWeekCompletePercent) / lastWeekCompletePercent) * 100).toFixed(2));

		function countsTillThisWeekDay(totalCounts: number[], chartData: ChartData): { total: number; completed: number } {
			const todayDay = new Date().getDay() - 1; // Between 0-5 (monday-saturday)
			const counts = {
				total: 0,
				completed: 0,
			};
			for (let i = 0; i <= todayDay; i++) {
				counts.total += totalCounts[i];
				counts.completed += chartData[i];
			}
			return counts;
		}
		function getCompletePercent(counts: { total: number; completed: number }): number {
			return (counts.completed / counts.total) * 100;
		}
	});

	function getWeeklyOverviewSeries(weeklyOverviewData: WeeklyOverviewData): ChartSeries[] {
		if (!weeklyOverviewData?.thisWeek?.length || !weeklyOverviewData?.lastWeek?.length) {
			return [];
		}
		const lastIndexOfValue = weeklyOverviewData.thisWeek.map((item) => item > 0).lastIndexOf(true);
		let thisWeekData;
		if (lastIndexOfValue === -1 || lastIndexOfValue === weeklyOverviewData.thisWeek.length - 1) {
			thisWeekData = weeklyOverviewData.thisWeek;
		} else {
			thisWeekData = weeklyOverviewData.thisWeek.slice(0, lastIndexOfValue + 1);
		}
		return [
			{ name: 'Last Week', data: weeklyOverviewData.lastWeek }, // "Last Week" on index 0 'cause it'll go in the background of "This Week" chart
			{ name: 'This Week', data: thisWeekData },
		];
	}

	function updateChartOptions(chartSeries: ChartSeries[]): void {
		setTimeout(() => {
			const yAxisMax: ApexOptions = {
				yaxis: { max: getMaxYAxisValue(chartSeries) },
			};
			// chartOptions.value = ChartOptions.line(chartEvents, yAxisMax);
			apexChartRef.value?.updateOptions(ChartOptions.line(chartEvents, yAxisMax), true, true, true);
		}, 0);
	}

	function getMaxYAxisValue(chartSeries: ChartSeries[]): number {
		return Math.max(...chartSeries.flatMap((item) => item.data).filter((i) => i)) + 2;
	}

	function updateGraphBorderStyle(apexChartContext): void {
		const apexChartsGrid: HTMLDivElement = apexChartContext?.el?.getElementsByClassName('apexcharts-grid')?.item(0);
		if (apexChartsGrid) {
			const apexChartsGridRect: DOMRect = apexChartsGrid.getBoundingClientRect();
			const graphWrapperRect: DOMRect = graphRef.value?.$el?.getBoundingClientRect();
			const paddingTop = 0;
			const paddingX = 0;
			graphBorderStyle.value = {
				width: `${apexChartsGridRect.width + paddingX * 2}px`,
				height: `${apexChartsGridRect.height + paddingTop}px`,
				top: `${apexChartsGridRect.top - graphWrapperRect.top - paddingTop}px`,
				left: `${apexChartsGridRect.left - graphWrapperRect.left - paddingX}px`,
			};
		}
	}
</script>

<style scoped lang="scss">
	.calendar-section {
		display: flex;
		flex-direction: column;
		height: auto;
		border-radius: 20px;
		border: 1px solid $separator-color;
		overflow: hidden;
		box-shadow: rgba(0, 0, 0, 0.04) 0px 30px 75px -5px, rgba($separator-color, 0.5) 0px 20px 35px -5px;

		.title {
			font-size: 28px;
			font-weight: 500;
		}

		.graph-change-btn {
			width: 36px;
			height: 36px;
			border-radius: 10px;
		}

		.stats {
			justify-content: flex-start;
			align-items: flex-start;

			&,
			.completed {
				display: flex;
				flex-direction: column;
				gap: 5px;
				line-height: 100%;
			}

			.completed {
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: 34px;
				font-weight: bolder;
			}

			.change {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
			}

			.positive,
			.negative {
				gap: 2px;

				&,
				.arrow {
					display: inline-flex;
					justify-content: center;
					align-items: center;
				}
				.arrow {
					font-size: 25px;
					line-height: 0px;
					width: 16px;
					height: 16px;
				}
			}

			.positive {
				color: $positive;
			}

			.negative {
				color: $negative;
			}

			.change-status {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.icon {
					font-size: 20px;
				}
			}
		}

		.actions {
			.btn {
				color: $secondary;
				border-radius: 10px;
				padding: 10px 15px;

				:deep() {
					.q-btn__content {
						flex-wrap: nowrap;
						white-space: nowrap;
					}
				}
			}
		}

		.graph {
			flex-grow: 1;
			padding-bottom: 20px;

			:deep() {
				.apexcharts-tooltip {
					background: transparent;
					border: none;
					color: $background;
					font-size: 16px;
					transform: translate(-68%, -68%);
					overflow: visible;

					.apexcharts-tooltip-series-group {
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						padding: 0px 25px;
						overflow: visible;
						border-radius: 7px;

						// &::after {
						// 	z-index: -1;
						// 	position: absolute;
						// 	display: block;
						// 	content: '';
						// 	width: 10px;
						// 	height: 10px;
						// 	bottom: -4px;
						// 	border-radius: 3px;
						// 	transform: rotate(45deg);
						// 	transform-origin: center;
						// 	background: inherit;
						// }

						.apexcharts-tooltip-text {
							font-size: inherit;
						}
						.apexcharts-tooltip-text-goals-value,
						.apexcharts-tooltip-text-y-value,
						.apexcharts-tooltip-text-z-value {
							margin: 0;
						}
					}
				}
			}
			.border {
				z-index: 0;
				position: absolute;
				display: block;
				top: 0;
				border-radius: 10px;
				border: 1px solid #e6e4f0;
			}
			.week-days {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// padding: 0 2.5%;
				margin-top: 10px;
				font-size: 12px;
				// gap: 12%;

				> span {
					text-align: center;
					min-width: 30px;
					flex-grow: 1;
				}
			}
		}
	}
</style>
