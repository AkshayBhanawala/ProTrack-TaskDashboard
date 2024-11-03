<template>
	<div class="notification-side-bar">
		<NotificationItem v-for="notification in notificationItems" :key="notification.id" v-bind="notification" />
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	import NotificationItem from '@/components/NotificationItem.component.vue';
	import { useNotificationItemsStore } from '@/stores/store';

	defineOptions({
		name: 'NotificationSideBar',
	});

	const notificationItemsStore = useNotificationItemsStore();
	const notificationItems = computed(() => notificationItemsStore.notifications);
</script>

<style scoped lang="scss">
	.notification-side-bar {
		display: flex;
		flex-direction: column;
		padding: 20px 5px;
	}
</style>
