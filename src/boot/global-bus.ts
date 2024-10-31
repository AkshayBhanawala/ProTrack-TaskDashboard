import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

declare module 'vue' {
	interface ComponentCustomProperties {
		$bus: EventBus;
	}
}

export default boot(({ app }) => {
	const bus = new EventBus()
	app.config.globalProperties.$bus = bus;
	app.provide('bus', bus)
});
