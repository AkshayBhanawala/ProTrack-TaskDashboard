import { ref } from 'vue';

export function usePromiseLoading() {
	const isLoading = ref(false);
	const error = ref<Error | null>(null);

	const fetchData = async (fetchFn: () => Promise<any>) => {
		isLoading.value = true;
		error.value = null;

		try {
			const result: unknown = await fetchFn();
			return result;
		} catch (e) {
			error.value = e as Error;
			console.error('Error fetching data:', e);
		} finally {
			isLoading.value = false;
		}
	};

	return {
		isLoading,
		error,
		fetchData
	};
}
