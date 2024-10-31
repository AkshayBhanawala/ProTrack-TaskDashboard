import mitt from 'mitt';
import { ref } from 'vue';

export function usePromiseLoading() {
	const isLoading = ref(false);
	const loadingEvent = mitt<{ change: boolean }>();
	const error = ref<Error | null>(null);

	const fetchData = async <T>(fetchFn: () => Promise<T>) => {
		isLoading.value = true;
		loadingEvent?.emit('change', isLoading.value);
		error.value = null;

		try {
			return (await fetchFn());
		} catch (e) {
			error.value = e as Error;
			console.error('Error fetching data:', e);
		} finally {
			isLoading.value = false;
			loadingEvent?.emit('change', isLoading.value);
		}
	};

	return {
		isLoading,
		loadingEvent,
		error,
		fetchData
	};
}
