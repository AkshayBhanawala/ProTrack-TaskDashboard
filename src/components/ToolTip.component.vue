<template>
	<q-tooltip class="tooltip-wrapper" :offset="[5, 5]" :anchor="props.anchor" :self="props.self">
		<template v-if="slots?.default">
			{{ slots.default }}
		</template>
		<span class="tooltip-text" v-else>{{ text }}</span>
	</q-tooltip>
</template>
<script setup lang="ts">
	import { QTooltipProps } from 'quasar';
	import { useSlots } from 'vue';

	interface Props extends QTooltipProps {
		text?: string;
	}

	defineOptions({
		name: 'ToolTip',
	});
	const props = withDefaults(defineProps<Props>(), {});

	const slots = useSlots();
</script>
<style scoped lang="scss">
	// .tooltip-wrapper {
	// 	.tooltip-text {
	// 		//
	// 	}
	// }
</style>
