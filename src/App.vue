<template>
	<router-view />
</template>

<script setup lang="ts">
	import { register } from 'swiper/element';
	register();

	defineOptions({
		name: 'App',
	});
</script>
