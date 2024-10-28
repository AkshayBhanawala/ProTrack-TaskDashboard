<template>
	<q-card class="notes-section">
		<q-card-section vertical class="row justify-between items-center q-py-sm">
			<span class="header2 title">Tasks for the day</span>
			<div class="header-actions">
				<q-btn unelevated dense rounded icon="sym_r_add" class="color-primary add-btn">
					<ToolTip text="Add Task" />
				</q-btn>
				<q-btn outline dense rounded icon="sym_r_arrow_forward_ios" class="color-secondary next-btn">
					<ToolTip text="Next Day" />
				</q-btn>
			</div>
		</q-card-section>
		<q-card-section vertical class="note-cards">
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
	import moment, { Moment } from 'moment';
	import { QCardSection } from 'quasar';
	import { ref } from 'vue';
	import ToolTip from '../ToolTip.vue';
	defineOptions({
		name: 'TaskForTheDaySection',
		components: {
			ToolTip,
		},
	});

	withDefaults(defineProps<Props>(), {});

	enum PartialTaskStatus {
		VALUE = 'PARTIAL',
	}

	type TaskStatus = boolean | PartialTaskStatus.VALUE;

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	interface Tag {
		label: string;
		color: string;
	}
	const tags = {
		Donations: { label: 'Donations', color: 'accent2' },
		Social: { label: 'Social', color: 'accent' },
		Sports: { label: 'Sports', color: 'secondary' },
		SelfCare: { label: 'SelfCare', color: 'tertiary' },
		Shopping: { label: 'Shopping', color: 'negative' },
	};

	class BaseTask<AllowedStatus = TaskStatus> {
		label: string;
		isCompleted: AllowedStatus;
		date: Moment;
		// inProgress: boolean;
		// dateAdded: Moment;
		// dateCompleted?: Moment;

		constructor(label: string, isCompleted: AllowedStatus, date: Moment) {
			this.label = label;
			this.isCompleted = isCompleted;
			this.date = date;
			// this.inProgress = inProgress;
			// this.dateAdded = dateAdded;
			// this.dateCompleted = dateCompleted;
		}
	}

	class Task extends BaseTask {
		subtasks: BaseTask<boolean>[];
		tags: Tag[];

		constructor(label: string, isCompleted: boolean, date: Moment, subtasks: BaseTask<boolean>[] = [], tags: Tag[] = []) {
			super(label, isCompleted, date);
			this.subtasks = subtasks?.length ? subtasks : [];
			this.tags = tags?.length ? tags : [];
		}

		getDates() {
			return this.subtasks.map((subtask) => subtask.date);
		}

		get isFullyCompleted(): TaskStatus {
			if (!this.subtasks?.length) {
				return this.isCompleted;
			}
			const states = new Set(this.subtasks.map((subtask) => subtask.isCompleted));
			if (states.size > 1) {
				return PartialTaskStatus.VALUE;
			} else {
				return [...states]?.at(0) || false;
			}
		}

		set isFullyCompleted(value: boolean) {
			this.isCompleted = value;
			this.subtasks.forEach((subtask) => {
				subtask.isCompleted = value;
			});
		}

		isPartiallyCompleted() {
			if (this.subtasks?.length) {
				return false;
			}
			return new Set(this.subtasks.map((subtask) => subtask.isCompleted)).size > 1;
		}
	}

	const tasks = ref<Task[]>(getTasksForTheDay());

	function getTasksForTheDay(): Task[] {
		const task1 = new Task('Donate Rs. 1000 to the charity', true, moment());
		task1.subtasks = [new BaseTask('Donate Rs. 500 to the charity', true, moment()), new BaseTask('Donate Rs. 500 to the charity', true, moment())];
		task1.tags = [tags.Donations, tags.Social];

		const task2 = new Task('Do 500 pushups', false, moment());
		task2.subtasks = [
			new BaseTask('Start with 100', true, moment()),
			new BaseTask('Complete 200', true, moment()),
			new BaseTask('Reach 400', false, moment()),
			new BaseTask('Complete 500', false, moment()),
		];
		task2.tags = [tags.Sports, tags.SelfCare];

		const task3 = new Task('Buy new headset', true, moment());
		task3.tags = [tags.Shopping];

		const task4 = new Task('Clean the room', false, moment());
		task4.tags = [tags.SelfCare];

		return [task1, task2, task3, task4];
	}
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
			display: flex;
			gap: 15px;

			.add-btn,
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

		.note-cards {
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
