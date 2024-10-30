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
					<span class="count">20</span>
					<span class="change small text-bold">
						<span v-if="changePercent > 0" class="positive">
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
					<span v-if="changePercent > 0" class="positive">
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
	import { onMounted, ref, useTemplateRef } from 'vue';
	import { VueApexChartsComponent } from 'vue3-apexcharts';

	import ToolTip from '@/components/ToolTip.component.vue';
	import { ApexChartEvents, ChartSeries, getChartOptions } from '@/models/WeeklyOverview.model';
	import { weeklyOverviewService } from '@/services';

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

	const changePercent = ref(0);
	const graphRef = useTemplateRef<QCardSection>('graphRef');
	const apexChartRef = useTemplateRef<VueApexChartsComponent>('apexChartRef');
	const graphBorderStyle = ref({});
	const chartSeries = ref<ChartSeries[]>([]);
	const chartOptions = ref<ApexOptions>();

	const chartEvents: ApexChartEvents = {
		mounted: function (chartContext, config: ApexOptions) {
			console.log('mounted:', chartContext, config);
			updateGraphBorderStyle(chartContext);
		},
		updated: function (chartContext, config: ApexOptions) {
			console.log('updated:', chartContext, config);
			updateGraphBorderStyle(chartContext);
		},
	};
	chartOptions.value = getChartOptions.line(chartEvents);

	onMounted(async () => {
		try {
			const data = await weeklyOverviewService.fetchWeeklyOverview();
			changePercent.value = getChangePercent(data.series);
			// Update chart data
			const yAxisMax: ApexOptions = {
				yaxis: { max: getMaxYAxisValue(data.series) },
			};
			chartOptions.value = getChartOptions.line(chartEvents, yAxisMax);
			chartSeries.value = data.series;

			// apexChartRef.value?.updateOptions(chartOptions.value);
			// apexChartRef.value?.updateSeries(data.series);
		} catch (error) {
			console.error('Failed to load weekly overview:', error);
		}
	});

	function getChangePercent(chartSeries: ChartSeries[]): number {
		const todayDay = new Date().getDay() - 1; // 0-5 (monday-saturday)
		let thisWeekCompletedCount = 0;
		for (let i = 0; i <= todayDay; i++) {
			thisWeekCompletedCount += chartSeries[0].data[i];
		}
		let lastWeekCompletedCount = 0;
		for (let i = 0; i <= todayDay; i++) {
			lastWeekCompletedCount += chartSeries[1].data[i];
		}
		return Number(((thisWeekCompletedCount / lastWeekCompletedCount) * 100).toFixed(2));
	}

	function getMaxYAxisValue(chartSeries: ChartSeries[]): number {
		return Math.max(...chartSeries.flatMap((item) => item.data).filter((i) => i)) + 5;
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
