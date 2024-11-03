<template>
	<q-slide-item class="notification-slide-item" @left="onLeft" :class="{ deleted: isDeleted }">
		<template v-slot:left>
			<q-icon left name="sym_r_remove" />
			Dismiss
		</template>

		<q-item :color="props.color">
			<q-avatar class="notification-avatar">
				<img v-if="props.avatar || (props.avatar && props.icon)" :src="props.avatar" draggable="false" />
				<q-icon v-if="props.icon && !props.avatar" :name="`sym_r_${props.icon}`" />
			</q-avatar>

			<div class="text-container" v-if="props.title || props.subtext">
				<div v-if="props.title" class="header3 ellipsis">{{ props.title }}</div>
				<div v-if="props.subtext" class="subtext">{{ props.subtext }}</div>
			</div>
		</q-item>
	</q-slide-item>
</template>
<script setup lang="ts">
	import { ref } from 'vue';

	import { INotificationItem } from 'src/models/NotificationItem.model';
	import { useNotificationItemsStore } from 'src/stores/store';

	defineOptions({
		name: 'NotificationItem',
	});

	interface Props extends INotificationItem {
		id: string;
		title?: string;
		subtext?: string;
		avatar?: string;
		icon?: string;
		color?: string;
	}

	const props = withDefaults(defineProps<Props>(), {});
	const notificationsStore = useNotificationItemsStore();
	const isDeleted = ref(false);

	function onLeft() {
		isDeleted.value = true;
		setTimeout(() => notificationsStore.removeNotificationItem(props), 900);
		// setTimeout(() => {
		// 	reset();
		// 	isDeleted.value = false;
		// }, 1000);
	}
</script>
<style scoped lang="scss">
	.notification-slide-item {
		border-radius: 20px;
		max-height: 100px;
		margin-bottom: 1.5vh;
		transform-origin: top;
		transition: max-height 0.5s ease-in-out, margin-bottom 0.6s ease-in;

		&.deleted {
			max-height: 0px;
			margin-bottom: 0px;
		}

		:deep() {
			color: black;

			.q-slide-item__left {
				color: $text;
				background-color: rgba($negative, 0.2);
			}
			.q-slide-item__content {
				border-radius: inherit;

				.q-item {
					border-radius: inherit;
					padding: 0px;
					background-color: scale-color($text, $lightness: 70%);

					&[color='primary'] {
						background-color: scale-color($primary, $lightness: 45%);
					}
					&[color='secondary'] {
						background-color: scale-color($secondary, $lightness: 45%);
					}
					&[color='tertiary'] {
						background-color: scale-color($tertiary, $lightness: 45%);
					}
					&[color='accent'] {
						background-color: scale-color($accent, $lightness: 45%);
					}
					&[color='positive'] {
						background-color: scale-color($positive, $lightness: 45%);
					}
					&[color='negative'] {
						background-color: scale-color($negative, $lightness: 45%);
					}
				}

				.q-avatar {
					background-color: rgba($background, 0.5);
					border-radius: inherit;
					padding: 2px;
					flex-shrink: 0;
					height: auto;
					width: auto;

					> * {
						height: 100%;
						width: 100%;
					}

					img {
						height: 100px;
						width: 100px;
					}

					.q-icon {
						font-size: 2rem;
						padding: 10px;
					}
				}
				.text-container {
					padding: 10px;
					display: flex;
					flex-direction: column;
					width: 100%;
					overflow: hidden;
				}
			}
		}
	}
</style>
