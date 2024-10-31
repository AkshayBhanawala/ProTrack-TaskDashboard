<template>
	<q-header reveal class="q-py-md" height-hint="98">
		<q-toolbar>
			<q-btn dense flat round size="xl" icon="sym_r_menu" class="lt-md" @click="leftSideBarState.toggleSideBar()">
				<ToolTip text="Menu" />
			</q-btn>

			<q-toolbar-title class="row justify-start items-center" style="column-gap: 10%; row-gap: 10px">
				<div class="row inline justify-center items-center q-ml-lg" style="gap: 15px">
					<q-avatar>
						<img src="images/logo-mono-white.svg" alt="Avatar" />
					</q-avatar>
					<div>ProTrack</div>
				</div>
				<div class="row inline justify-center items-center search-wrapper" style="gap: 15px">
					<q-input dark dense rounded standout v-model="searchText" placeholder="Search" :class="{ 'has-value': searchText?.length }">
						<template v-slot:prepend>
							<q-icon name="sym_r_search" class="q-mr-sm" />
						</template>
						<template v-slot:append>
							<q-icon :class="{ invisible: !searchText?.length }" name="sym_r_close" @click="searchText = ''" class="cursor-pointer" />
						</template>
					</q-input>
				</div>
			</q-toolbar-title>

			<div class="row justify-center items-center actions-wrapper">
				<q-btn unelevated color="primary" icon="sym_r_add" label="Add Tasks" class="add-task-btn">
					<ToolTip text="Add Tasks" />
				</q-btn>
				<q-btn
					flat
					round
					dense
					size="lg"
					icon="sym_r_notifications"
					class="color-secondary notifications-btn"
					@click="rightSideBarState.toggleSideBar()"
				>
					<q-badge floating rounded class="badge">2</q-badge>
					<ToolTip text="Notifications" />
				</q-btn>
				<AccountInfoCard photo-only no-border no-online-status style="cursor: pointer; margin-left: 5px" />
			</div>
		</q-toolbar>
	</q-header>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	import AccountInfoCard from '@/components/AccountInfoCard.component.vue';
	import ToolTip from '@/components/ToolTip.component.vue';
	import { useLeftSideBarStore, useRightSideBarStore } from '@/stores/store';

	defineOptions({
		name: 'HeaderMain',
		components: {
			AccountInfoCard,
			ToolTip,
		},
	});

	const searchText = ref('');
	const leftSideBarState = useLeftSideBarStore();
	const rightSideBarState = useRightSideBarStore();
</script>

<style scoped lang="scss">
	header {
		background: $header-bg-gradient-color1;
		background: $header-bg-gradient;

		* {
			transition: 0.2s ease;
		}

		.search-wrapper {
			:deep() {
				.q-field--standout:not(.q-field--highlighted):not(.has-value) {
					.q-field__control {
						background: rgba(255, 255, 255, 0.3);
						.q-field__prepend .q-icon {
							color: rgba($text, 0.5);
						}
					}

					.q-field__control:hover {
						background: rgba(255, 255, 255, 0.65);
					}
				}

				.q-field--highlighted,
				.has-value {
					.q-field__control {
						background-color: $background;
						color: $text;
						box-shadow: none;

						.q-field__prepend .q-icon {
							color: $primary;
						}
						.q-field__native,
						.q-field__append .q-icon {
							color: $text !important;
						}
						.q-field__append .q-icon {
							opacity: 0.7;
						}
					}
				}

				.q-field__native,
				.q-field__prefix,
				.q-field__suffix,
				.q-field__input {
					color: $text;
				}
			}
		}

		.actions-wrapper {
			gap: 10px;

			.add-task-btn {
				border-radius: 15px;
				padding: 10px 25px 10px 15px;
			}

			.notifications-btn {
				.badge {
					background-color: $negative;
					transform: translate(-6px, 8px);
				}
			}
		}
	}
</style>
