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
	import { QCardSection, getCssVar } from 'quasar';
	import { ref, useTemplateRef } from 'vue';
	import { VueApexChartsComponent } from 'vue3-apexcharts';
	import ToolTip from '../ToolTip.vue';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	interface ChartSeries {
		name: string;
		data: number[];
	}

	defineOptions({
		name: 'WeeklyOverviewCard',
		components: {
			ToolTip,
		},
	});
	withDefaults(defineProps<Props>(), {});

	const changePercent = ref(getRandomChangePercent());
	const graphRef = useTemplateRef<QCardSection>('graphRef');
	const apexChartRef = useTemplateRef<VueApexChartsComponent>('apexChartRef');
	const graphBorderStyle = ref({});
	const chartSeries = ref<ChartSeries[]>([]);
	const chartOptions = ref<ApexOptions>({
		chart: {
			type: 'line',
			fontFamily: 'inherit',
			height: '250px',
			width: '100%',
			stacked: false,
			sparkline: { enabled: true },
			animations: {
				enabled: true,
				animateGradually: { enabled: true, delay: 500 },
				dynamicAnimation: { enabled: true, speed: 500 },
			},
			dropShadow: {
				enabled: true,
				enabledOnSeries: [0],
				top: 20,
				left: 0,
				blur: 15,
				color: getCssVar('secondary') ?? '',
				opacity: 0.3,
			},
			toolbar: { show: false },
			events: {
				mounted: function (chartContext, config: ApexOptions) {
					console.log('mounted:', chartContext, config);
					updateGraphBorderStyle(chartContext);
				},
				updated: function (chartContext, config: ApexOptions) {
					console.log('updated:', chartContext, config);
					updateGraphBorderStyle(chartContext);
				},
			},
		},
		colors: [getCssVar('tertiary'), getCssVar('primary')],
		// fill: { opacity: 0.8, type: 'solid' },
		stroke: {
			show: true,
			curve: 'monotoneCubic',
			lineCap: 'round',
			colors: undefined,
			width: 7,
			dashArray: 0,
		},
		tooltip: {
			enabled: true,
			fillSeriesColor: true,
			// shared: false,
			// intersect: false,
			onDatasetHover: { highlightDataSeries: true },
			x: { show: false },
			y: { title: { formatter: () => '' } },
		},
		noData: { text: 'No Data' },
		grid: {
			show: false,
			// padding: { left: 30, right: 30 }
		},
		dataLabels: { enabled: false },
		markers: { size: 0 },
		xaxis: {
			tickPlacement: 'between',
			categories: ['Mon', 'Tues', 'Wed', 'Thus', 'Fri', 'Sat'],
			// overwriteCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			labels: { show: true },
			axisBorder: { show: false },
			axisTicks: { show: false },
			crosshairs: { show: false },
			tooltip: { enabled: false },
		},
		yaxis: {
			show: false,
			forceNiceScale: true,
			min: 0,
			axisBorder: { show: false },
			axisTicks: { show: false },
			crosshairs: { show: false },
			tooltip: { enabled: false },
		},
		legend: { show: false },
	});

	setTimeout(() => {
		const newDataSeries = [
			{
				name: 'this week',
				data: [12, 17, 12, 17, 16],
			},
			{
				name: 'last week',
				data: [5, 8, 5, 10, 7, 15],
			},
		];
		chartOptions.value.yaxis = {
			...chartOptions.value.yaxis,
			max: Math.max(...newDataSeries.flatMap((item) => item.data).filter((i) => i !== null)) + 5,
		};
		apexChartRef.value?.updateOptions(chartOptions.value);
		chartSeries.value = [...newDataSeries] as ChartSeries[];
	}, 0);

	function getRandomChangePercent() {
		const precision = 100;
		return Math.floor((0.5 - Math.random()) * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
	}

	function updateGraphBorderStyle(apexChartContext) {
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
