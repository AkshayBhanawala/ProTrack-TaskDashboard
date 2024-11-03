import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('src/layouts/Main.layout.vue'),
		children: [
			{ path: '', component: () => import('src/pages/Dashboard.page.vue') },
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
