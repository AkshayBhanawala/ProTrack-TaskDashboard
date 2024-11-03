import { createPinia, getActivePinia, Pinia, Store } from 'pinia'
import { store } from 'quasar/wrappers'
import { Router } from 'vue-router';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
	export interface PiniaCustomProperties {
		readonly router: Router;
	}
}

interface ExtendedPinia extends Pinia {
	_s: Map<string, Store>;
}

export function resetPiniaStores(): void {
	const pinia = getActivePinia() as ExtendedPinia;
	if (!pinia) {
		return;
	}
	const storesToReset: string[] = [
		// 'GlobalSpinnerState',
		// 'LeftSideBarState',
		// 'RightSideBarState',
		'BiWeeklyTasks',
		'Notifications',
		// 'NotesState',
		'SelectedDate',
		'TaskTags'
	];
	pinia._s.forEach(store => {
		if (storesToReset.includes(store.$id)) {
			store.$reset();
		}
	});
};

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
	const pinia = createPinia()

	// You can add Pinia plugins here
	// pinia.use(SomePiniaPlugin)

	return pinia
})
