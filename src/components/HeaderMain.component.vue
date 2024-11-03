<template>
	<q-header reveal class="q-py-md" height-hint="98">
		<q-toolbar class="header-toolbar">
			<q-btn dense flat round size="xl" icon="sym_r_menu" class="lt-lg hamburger-btn" @click="leftSideBarState.toggleSideBar()">
				<ToolTip text="Menu" />
			</q-btn>

			<q-toolbar-title class="header-tool-bar-title">
				<div class="row inline justify-center items-center no-wrap logo-wrapper" style="gap: 15px">
					<q-avatar class="logo-mono-white-no-circle logo-icon">
						<img src="images/logo-mono-white-no-circle.svg" alt="Avatar" />
					</q-avatar>
					<div class="logo-text">ProTrack</div>
				</div>
				<div class="row inline justify-center items-center search-wrapper" style="gap: 15px">
					<q-input
						dark
						dense
						rounded
						standout
						v-model="searchText"
						placeholder="Search"
						:class="{ 'has-value': searchText?.length }"
						@focus="notifyToast_NotImplemented()"
					>
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
				<q-btn unelevated color="primary" icon="sym_r_add" label="Add Tasks" class="add-task-btn" @click="openAddNewTaskDialog()">
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
					<q-badge v-if="notifications.length" floating rounded class="badge">{{ notifications.length }}</q-badge>
					<ToolTip text="Notifications" />
				</q-btn>
				<AccountInfoCard photo-only no-border no-online-status style="cursor: pointer; margin-left: 5px" />
			</div>
		</q-toolbar>
	</q-header>
</template>

<script setup lang="ts">
	import { Dialog } from 'quasar';
	import { computed, ref } from 'vue';

	import AccountInfoCard from '@/components/AccountInfoCard.component.vue';
	import TaskDialog from '@/components/dialogs/TaskDialog.component.vue';
	import ToolTip from '@/components/ToolTip.component.vue';
	import { Task } from '@/models';
	import { useBiWeeklyTasksStore, useLeftSideBarStore, useNotificationItemsStore, useRightSideBarStore } from '@/stores/store';
	import { notifyToast_NotImplemented, notifyToast_TaskAdded } from '@/utils/notification-toast.util';

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
	const biWeeklyTaskStore = useBiWeeklyTasksStore();
	const notificationsStore = useNotificationItemsStore();
	const notifications = computed(() => notificationsStore.notifications);

	function openAddNewTaskDialog() {
		Dialog.create({
			component: TaskDialog,
			componentProps: {
				taskOperation: 'ADD',
			},
		})
			.onOk((newTask: Task) => {
				biWeeklyTaskStore.addNewTask(newTask);
				notifyToast_TaskAdded();
			})
			.onCancel(() => {})
			.onDismiss(() => {});
	}
</script>

<style scoped lang="scss">
	header {
		background: $header-bg-gradient-color1;
		background: $header-bg-gradient;

		* {
			transition: 0.2s ease;
		}

		.header-toolbar {
			.header-tool-bar-title {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				text-overflow: clip;
				gap: 10%;

				.logo-wrapper {
					margin-left: 24px;
				}
			}
			@media (max-width: 890px) {
				.header-tool-bar-title {
					gap: 10px;

					.logo-wrapper {
						margin-left: 0;
					}
				}
			}
			@media (max-width: 530px) {
				.hamburger-btn {
					min-width: min-content;
					:deep() {
						.q-btn__content {
							width: min-content;
						}
					}
				}
				.header-tool-bar-title {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 0 5px;

					.logo-text {
						display: none;
					}
				}
			}
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
				@media (max-width: 890px) {
					.q-field {
						flex-shrink: 1;
						width: 80%;
					}
				}
				@media (max-width: 530px) {
					.q-field {
						width: 100%;
					}
					.q-field__prepend {
						padding-right: 0;
						.q-icon {
							margin-right: 0;
						}
					}
					.q-field__append {
						display: none;
					}
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

			@media (max-width: 890px) {
				.add-task-btn {
					padding: 10px;
					:deep() {
						.q-btn__content {
							.q-icon {
								margin: 0;
							}
							span.block {
								display: none !important;
							}
						}
					}
				}
			}

			@media (max-width: 420px) {
				gap: 5px;

				.add-task-btn {
					display: none;
				}
			}
		}
	}
</style>
