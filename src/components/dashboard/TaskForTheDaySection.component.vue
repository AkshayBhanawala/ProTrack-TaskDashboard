<template>
	<q-card class="notes-section">
		<q-card-section vertical class="row justify-between items-center q-py-sm">
			<span class="header2 title">Tasks for the day</span>
			<div class="header-actions">
				<q-btn unelevated dense rounded icon="sym_r_add" class="color-primary add-btn">
					<ToolTip text="Add Task" />
				</q-btn>
				<div class="group">
					<q-btn outline dense rounded icon="sym_r_arrow_back_ios_new" class="color-secondary previous-btn" @click="selectedDayStore.previousDay()">
						<ToolTip text="Previous Day" />
					</q-btn>
					<q-btn outline dense rounded icon="sym_r_arrow_forward_ios" class="color-secondary next-btn" @click="selectedDayStore.nextDay()">
						<ToolTip text="Next Day" />
					</q-btn>
				</div>
			</div>
		</q-card-section>
		<q-card-section vertical class="task-count-cards">
			<q-card v-for="(task, i) in tasks" :key="i" :index="i" class="note-card" outline>
				<q-card-section horizontal class="note-section-top">
					<div class="note">
						<q-checkbox
							:label="task.label"
							:indeterminate-value="PartialTaskStatus.VALUE"
							:class="{ 'text-strike color-primary': task.isCompleted }"
							v-model="task.isFullyCompleted"
							dense
							color="primary"
						/>
						<div class="sub-tasks">
							<q-checkbox
								v-for="(subtask, j) in task?.subtasks"
								:key="j"
								:label="subtask.label"
								:index="j"
								:class="{ 'text-strike color-primary': subtask.isCompleted }"
								v-model="subtask.isCompleted"
								@vue:updated="task.checkCompleted()"
								dense
								color="primary"
							/>
						</div>
						<div class="tags">
							<q-icon name="sym_r_sell" size="sm" data-color="tertiary" class="tag-icon" />
							<q-chip v-for="(tag, k) in task?.tags" :key="k" :label="tag.label" :data-color="tag.color" class="tag" />
						</div>
					</div>
				</q-card-section>
				<q-card-section vertical class="note-section-bottom">
					<div v-if="task?.subtasks?.length" class="subtext subtask-complete-count">
						{{ task?.subtasks?.filter((subtask) => subtask.isCompleted).length }} / {{ task?.subtasks?.length }} Completed
					</div>
					<q-card-actions horizontal class="note-actions">
						<q-btn flat dense rounded icon="sym_r_edit" color="primary">
							<ToolTip text="Edit" />
						</q-btn>
						<q-btn flat dense rounded icon="sym_r_delete" color="negative">
							<ToolTip text="Delete" />
						</q-btn>
						<q-btn flat dense rounded icon="sym_r_steppers" color="secondary">
							<ToolTip text="More options" />
						</q-btn>
					</q-card-actions>
				</q-card-section>
			</q-card>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
	import { QCardSection } from 'quasar';
	import { computed } from 'vue';

	import ToolTip from '@/components/ToolTip.component.vue';
	import { PartialTaskStatus } from '@/models';
	import { useBiWeeklyTasksStore, useSelectedDayStore } from '@/stores/store';

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	defineOptions({
		name: 'TaskForTheDaySection',
		components: {
			ToolTip,
		},
	});

	withDefaults(defineProps<Props>(), {});

	const biWeeklyTaskStore = useBiWeeklyTasksStore();
	const selectedDayStore = useSelectedDayStore();

	const tasks = computed(() => {
		return biWeeklyTaskStore.getTaskForTheDayData;
	});
</script>

<style scoped lang="scss">
	.notes-section {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		border: none;
		box-shadow: none;
		background-color: transparent;

		.title {
			font-size: 28px;
			font-weight: 500;
		}

		.header-actions {
			&,
			> .group {
				display: flex;
				gap: 15px;
				margin-left: auto;
			}

			&.group,
			> .group {
				gap: 7.5px;
			}
			.add-btn,
			.previous-btn,
			.next-btn {
				width: 36px;
				height: 36px;
				border-radius: 10px;
			}

			.add-btn {
				background-color: rgba($primary, 0.3);

				:deep(.q-icon) {
					font-weight: 900;
				}
			}
		}

		.task-count-cards {
			display: flex;
			flex-direction: column;
			gap: 16px;
			padding: 16px;
			padding-top: 10px;
			padding-bottom: 20px;
			justify-content: space-between;

			.note-card {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				gap: 10px;
				padding: 15px;
				padding-bottom: 10px;
				border: 1px solid rgba($separator-color, 1);
				box-shadow: none;
				border-radius: 10px;
				overflow: hidden;

				.note-section-top {
					flex-grow: 1;
					justify-content: space-between;

					.note {
						display: flex;
						flex-direction: column;
						gap: 10px;

						&:deep() {
							.q-checkbox__label {
								font-weight: 500;
								font-size: 15px;
							}
							.q-checkbox__bg {
								border-radius: 5px;
							}
						}

						.sub-tasks {
							display: flex;
							flex-direction: column;
							gap: 10px;
							margin-left: 30px;
						}

						.tags {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: center;
							margin-top: auto;
							gap: 5px;

							.tag-icon {
								font-weight: 900;
								margin-right: 10px;
								background: radial-gradient(circle at 50% 50%, rgba(253, 113, 175, 0.2) 43%, white 50%),
									radial-gradient(circle at 30% 30%, rgba(253, 113, 175, 0.3) 4%, white 54%);
							}

							.tag {
								margin: 0px;
								pointer-events: none;
								font-weight: 500;
							}

							.tag,
							.tag-icon {
								&[data-color='primary'] {
									background-color: rgba($primary, 0.2);
									border-color: rgba($primary, 1);
									color: $primary;
									// opacity: 0.8;
								}

								&[data-color='secondary'] {
									background-color: rgba($secondary, 0.2);
									border-color: rgba($secondary, 1);
									color: $secondary;
									// opacity: 0.8;
								}

								&[data-color='tertiary'] {
									background-color: rgba($tertiary, 0.2);
									border-color: rgba($tertiary, 1);
									color: $tertiary;
									// opacity: 0.8;
								}

								&[data-color='accent'] {
									background-color: rgba($accent, 0.2);
									border-color: rgba($accent, 1);
									color: $accent;
									// opacity: 0.8;
								}

								&[data-color='accent2'] {
									background-color: rgba($accent2, 0.1);
									border-color: rgba($accent2, 1);
									color: $accent2;
									// opacity: 0.8;
								}

								&[data-color='negative'] {
									background-color: rgba($negative, 0.2);
									border-color: rgba($negative, 1);
									color: $negative;
									// opacity: 0.8;
								}
							}
						}
					}
				}

				.note-section-bottom {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: flex-start;
					flex-shrink: 10;
					padding: 0;

					.subtask-complete-count {
						font-size: 12px;
						opacity: 0.8;
						text-align: center;
					}

					.note-actions {
						padding: 10px 0px;
						justify-content: center;

						> button {
							padding: 0;
							height: 40px;
							width: 40px;
							margin: 0;

							:deep(.q-icon) {
								font-size: 28px;
							}
						}
					}
				}
			}
		}
	}
</style>
