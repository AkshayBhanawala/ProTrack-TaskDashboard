<template>
	<q-card class="user-account-card" flat :bordered="!noBorder" :class="{ online: !noOnlineStatus, 'fit-content': photoOnly }">
		<q-card-section horizontal class="content-wrapper" :class="{ 'q-pa-sm': !noBorder }">
			<q-card-section class="profile-photo">
				<q-img src="images/user-account-male-1.png" />
			</q-card-section>
			<q-card-section class="user-info" v-if="!photoOnly">
				<div class="user-name">Akshay Bhanawala</div>
				<div class="account-type color-subtext">Free Account</div>
			</q-card-section>
			<q-card-actions horizontal class="justify-around q-px-md" v-if="!photoOnly">
				<q-btn flat round icon="sym_r_settings"><ToolTip text="Settings" /></q-btn>
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>
<script setup lang="ts">
	import ToolTip from './ToolTip.vue';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	defineOptions({
		name: 'AccountInfoCard',
		components: {
			ToolTip,
		},
	});
	withDefaults(defineProps<Props>(), {});
</script>
<style scoped lang="scss">
	.user-account-card {
		border-radius: 10px;
		background: transparent;

		.content-wrapper {
			align-items: center;
			gap: 10px;

			.user-info {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				gap: 4px;

				.user-name {
					font-size: 16px;
					line-height: 110%;
					font-weight: 500;
				}
				.account-type {
					font-size: 14px;
				}
			}

			* {
				padding: 0px;
			}
		}

		.profile-photo {
			align-self: stretch;
			display: flex;
			justify-content: center;
			align-items: center;
			min-width: 60px;
			min-height: 60px;
			border-radius: 5px;
			background: $primary;
			background: linear-gradient(180deg, rgba($primary, 1) 0%, rgba($primary, 0.33) 100%);
		}

		&.online {
			.profile-photo::after {
				content: '';
				position: absolute;
				bottom: -3px;
				right: -6px;
				width: 18px;
				height: 18px;
				background-color: $accent;
				border: 3px solid $background;
				border-radius: 5px;
			}
		}
	}
</style>
