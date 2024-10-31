import { ApexOptions } from 'apexcharts';
import { extend, getCssVar } from 'quasar';

const baseChartOptions: ApexOptions = {
	chart: {
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
			enabledOnSeries: [1],
			top: 20,
			left: 0,
			blur: 15,
			color: getCssVar('secondary') ?? '',
			opacity: 0.3,
		},
		toolbar: { show: false },
		events: {},
	},
	colors: [getCssVar('primary'), getCssVar('tertiary')],
	// fill: { opacity: 0.8, type: 'solid' },
	stroke: {
		show: true,
		// curve: 'monotoneCubic',
		curve: 'smooth',
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
		min: -1,
		axisBorder: { show: false },
		axisTicks: { show: false },
		crosshairs: { show: false },
		tooltip: { enabled: false },
	},
	legend: { show: true, position: 'top', offsetY: 10 },
};

const lineChartOptions: ApexOptions = extend(true, {}, baseChartOptions, { chart: { type: 'line' } });

const barChartOptions: ApexOptions = extend(
	true, {}, baseChartOptions,
	{
		chart: { type: 'bar' },
		plotOptions: { bar: { horizontal: false } }
	}
);

export type ApexChartEvents = ApexChart['events'];

export const ChartOptions = {
	line: (events: ApexChartEvents, ...moreOptions: ApexOptions[]): ApexOptions =>
		extend(true, {}, lineChartOptions, { chart: { events } }, ...moreOptions),

	bar: (events: ApexChartEvents, ...moreOptions: ApexOptions[]): ApexOptions =>
		extend(true, {}, barChartOptions, { chart: { events } }, ...moreOptions),
};

export type ChartData = number[];
export type WeeklyOverviewData = { lastWeek: ChartData, thisWeek: ChartData };

export interface ChartSeries {
	name: string;
	data: ChartData;
}

export type WeeklyOverviewSeries = { series: ChartSeries[] };
