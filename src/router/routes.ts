import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/DashboardPage.vue') },
			{ path: 'index', component: () => import('pages/IndexPage.vue') },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		redirect() {
			history.back();
			return { path: '/' };
		},
		strict: true,
	},
];

export default routes;
