<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="task-dialog">
			<q-card-section class="row items-center q-pb-none">
				<div class="text-h6">
					{{ props.taskOperation === 'ADD' ? 'Add New Task' : 'Edit Task' }}
				</div>
				<q-space />
				<q-btn icon="sym_r_close" flat round dense v-close-popup />
			</q-card-section>

			<q-card-section class="q-pt-md">
				<q-form ref="formRef" class="q-gutter-md" autofocus @submit="onSubmit">
					<!-- Task Title -->
					<q-input
						rounded
						outlined
						clearable
						autofocus
						v-model="formData.label"
						placeholder="Title"
						:rules="[(val) => !!val || 'Title is required']"
						@update:model-value="formValueUpdated = true"
					/>

					<!-- Date -->
					<q-input
						rounded
						outlined
						clearable
						v-model="formData.date"
						mask="####/##/##"
						:rules="[(val) => !!val || 'Date is required']"
						readonly
						@click="datePopup?.show()"
						@update:model-value="formValueUpdated = true"
					>
						<template v-slot:append>
							<q-icon name="sym_r_event" class="cursor-pointer">
								<ToolTip text="Open Date Picker" />
								<q-popup-proxy ref="datePopup" bottom transition-show="jump-down" transition-hide="jump-up">
									<q-date
										no-unset
										minimal
										v-model="formData.date"
										:mask="dateFormat"
										:options="checkDateInRange"
										:navigation-min-year-month="getDateMinMonthInRange"
										:navigation-max-year-month="getDateMaxMonthInRange"
										@update:model-value="formValueUpdated = true"
									/>
								</q-popup-proxy>
							</q-icon>
						</template>
					</q-input>

					<!-- Subtasks -->
					<div class="subtasks q-mb-md">
						<div class="text-subtitle2 q-mb-sm row items-center justify-between">
							<span class="text-weight-medium">Subtasks</span>
							<q-btn round dense unelevated label="" icon="sym_r_add" color="primary" @click="addSubtask">
								<ToolTip text="Add Subtask" />
							</q-btn>
						</div>
						<div v-for="(subtask, index) in formData.subtasks" :key="index" class="row items-center q-mb-sm">
							<q-input
								rounded
								outlined
								dense
								clearable
								autofocus
								v-model="subtask.label"
								class="col"
								placeholder="New Subtask"
								@update:model-value="formValueUpdated = true"
							/>
							<q-btn round dense unelevated icon="sym_r_delete" color="negative" class="q-ml-sm" @click="removeSubtask(index)">
								<ToolTip text="Remove" />
							</q-btn>
						</div>
					</div>

					<!-- Tags -->
					<div class="q-mt-lg tags">
						<div class="text-subtitle2 q-mb-sm">Tags</div>
						<q-select
							rounded
							outlined
							clearable
							use-chips
							multiple
							v-model="formData.tags"
							placeholder="type..."
							input-debounce="0"
							max-values="3"
							hint="Add up to 3 tags, you can type as well"
							:use-input="(formData?.tags?.length || 0) < 3"
							:options="(formData?.tags?.length || 0) < 3 ? selectableTags : []"
							@new-value="createTags"
							@filter="tagsFilter"
							@update:model-value="formValueUpdated = true"
						/>
					</div>

					<!-- Actions -->
					<div class="row justify-end q-gutter-sm">
						<q-btn rounded unelevated :label="formValueUpdated ? 'Discard' : 'Cancel'" @click="onCancel" />
						<q-btn rounded unelevated :label="editTask ? 'Save' : 'Add'" type="submit" color="positive" />
					</div>
				</q-form>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
	import moment from 'moment';
	import { Dialog, QDialog, QForm, QPopupProxy, QSelect, useDialogPluginComponent } from 'quasar';
	import { ref, onMounted, computed } from 'vue';

	import ToolTip from '../ToolTip.component.vue';

	import ConfirmDialog from '@/components/dialogs/ConfirmDialog.component.vue';
	import { ITaskInput, Subtask, TagNameType, Task, TaskDialogProps } from '@/models';
	import { useBiWeeklyTasksStore, useTaskTagsStore } from '@/stores/store';

	const props = withDefaults(defineProps<TaskDialogProps>(), { taskOperation: 'ADD' });

	defineOptions({
		name: 'TaskDialog',
	});

	defineExpose({
		show: () => {
			dialogRef.value?.show();
		},
	});

	defineEmits([
		// REQUIRED; need to specify some events that your
		// component will emit through useDialogPluginComponent()
		...useDialogPluginComponent.emits,
	]);

	const dateFormat = 'YYYY/MM/DD';
	const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
	const biWeeklyTasksStore = useBiWeeklyTasksStore();
	const taskTagsStore = useTaskTagsStore();
	const taskTags = computed<TagNameType>(() => taskTagsStore.tags);
	const minMaxDates = computed(() => biWeeklyTasksStore.getMinMaxDates);
	const getDateMinMonthInRange = computed(() => {
		if (props.taskOperation === 'EDIT') {
			return minMaxDates.value.thisWeek.min.format('YYYY/MM');
		}
		return minMaxDates.value.min.format('YYYY/MM');
	});
	const getDateMaxMonthInRange = computed(() => {
		if (props.taskOperation === 'EDIT') {
			return minMaxDates.value.thisWeek.max.format('YYYY/MM');
		}
		return minMaxDates.value.max.format('YYYY/MM');
	});
	const datePopup = ref<QPopupProxy>();
	const availableTags = ref<string[]>(Object.keys(taskTags.value).sort());
	const selectableTags = ref<string[]>(availableTags.value);
	const formRef = ref<QForm>();
	const formData = ref<ITaskInput>(getDefaultFormData());
	const formValueUpdated = ref(false);

	onMounted(() => {
		console.log('onMounted', props);

		if (dialogRef?.value) {
			dialogRef.value.onHide = () => {
				console.log('onHide');
				formData.value = {
					label: '',
					isCompleted: false,
					date: moment().format('YYYY/MM/DD'),
					subtasks: [],
					tags: [],
				};
			};
		}
	});

	function getDefaultFormData(): ITaskInput {
		if (props.taskOperation === 'EDIT' && props.editTask) {
			const originalTask = JSON.parse(JSON.stringify(props.editTask));
			return {
				label: originalTask.label,
				isCompleted: originalTask.isCompleted || false,
				date: props.editTask.date.format('YYYY/MM/DD'),
				subtasks:
					originalTask.subtasks?.map((subtask) => ({
						label: subtask.label,
						isCompleted: subtask.isCompleted,
					})) || [],
				tags: originalTask.tags || [],
			};
		}
		return {
			label: '',
			isCompleted: false,
			date: moment().format('YYYY/MM/DD'),
			subtasks: [],
			tags: [],
		};
	}

	function checkDateInRange(date: string): boolean {
		if (props.taskOperation === 'EDIT') {
			return date >= minMaxDates.value.thisWeek.min.format('YYYY/MM/DD') && date <= minMaxDates.value.thisWeek.max.format('YYYY/MM/DD');
		}
		return date >= minMaxDates.value.min.format('YYYY/MM/DD') && date <= minMaxDates.value.max.format('YYYY/MM/DD');
	}

	function tagsFilter(val: string, update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void): void {
		update(() => {
			if (val === '') {
				selectableTags.value = availableTags.value;
			} else {
				const needle = val.toLowerCase();
				selectableTags.value = availableTags.value?.filter((v) => v.toLowerCase().indexOf(needle) > -1);
			}
		});
	}

	function createTags(val: string, done: (item?: any, mode?: 'add' | 'add-unique' | 'toggle') => void) {
		if (val.length > 0) {
			const modelValue = formData.value?.tags || [];

			val
				.split(/[,;| ]+/)
				.filter((v) => v.length)
				.map((v) =>
					v
						.trim()
						.replaceAll(/[^a-z0-9]/gi, '')
						.replaceAll(/\w\S*/gi, (txt) => `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()}`)
				)
				.forEach((v) => {
					if (!selectableTags.value.includes(v)) {
						selectableTags.value.push(v);
					}
					if (!modelValue.includes(v)) {
						modelValue.push(v);
					}
				});

			done(null);
			modelValue.length = modelValue.length <= 3 ? modelValue.length : 3;
			formData.value.tags = modelValue.sort();
			selectableTags.value = [...selectableTags.value].sort();
		}
	}

	function addSubtask(): void {
		formData.value.subtasks?.push({
			label: '',
			isCompleted: false,
		});
	}

	function removeSubtask(index: number): void {
		formData.value.subtasks?.splice(index, 1);
		formValueUpdated.value = true;
	}

	function onSubmit(): void {
		const newTask = new Task(formData.value.label?.trim(), formData.value.isCompleted, moment(formData.value.date?.trim().replaceAll('/', '-')));
		if (props.taskOperation === 'EDIT' && props.editTask?.id) {
			newTask.id = props.editTask.id;
		}
		const newTags: string[] = [];
		if (formData.value?.subtasks?.length) {
			for (const subtask of formData.value.subtasks) {
				if (subtask.label?.trim().length) {
					newTask.subtasks.push(new Subtask(subtask.label, subtask.isCompleted ?? false));
				}
			}
		}
		if (formData.value?.tags?.length) {
			newTask.tags = formData.value.tags?.map((tag) => {
				const tagName = taskTags.value[tag];
				if (tagName) {
					return tagName;
				} else {
					newTags.push(tag);
					return tag;
				}
			});
			if (newTags.length) {
				taskTagsStore.addTags(...newTags);
			}
		}
		onDialogOK(newTask);
	}

	function onCancel(): void {
		if (formValueUpdated.value) {
			showConfirmDialog();
		} else {
			onDialogCancel();
		}
	}

	function showConfirmDialog(): void {
		Dialog.create({
			component: ConfirmDialog,
			componentProps: {
				message: props.taskOperation === 'EDIT' ? 'Changes will not be saved!' : 'Data will not be saved!',
			},
		})
			.onOk(() => onDialogCancel())
			.onCancel(() => {})
			.onDismiss(() => {});
	}
</script>

<style lang="scss" scoped>
	.task-dialog {
		min-width: 400px;
		max-width: 600px;
	}
</style>
