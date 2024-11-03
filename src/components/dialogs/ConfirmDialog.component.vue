<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="confirm-dialog">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ props.title }}</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				{{ props.message }}
			</q-card-section>

			<q-card-actions align="right">
				<q-btn rounded unelevated :label="props.cancelLabel || 'Cancel'" :color="props.cancelColor || 'default'" flat @click="onCancel" />
				<q-btn rounded unelevated :label="props.confirmLabel || 'Confirm'" :color="props.confirmColor || 'primary'" @click="onConfirm" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
	import { QDialog, useDialogPluginComponent } from 'quasar';

	const props = defineProps({
		title: {
			type: String,
			default: 'Are you sure?',
		},
		message: {
			type: String,
			default: '',
		},
		confirmLabel: {
			type: String,
			default: 'Yes',
		},
		cancelLabel: {
			type: String,
			default: 'No',
		},
		confirmColor: {
			type: String,
			default: 'primary',
		},
		cancelColor: {
			type: String,
			default: '',
		},
	});
	const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

	defineOptions({
		name: 'ConfirmDialog',
	});

	defineExpose({
		show: () => dialogRef.value?.show(),
	});

	defineEmits([
		// REQUIRED; need to specify some events that your
		// component will emit through useDialogPluginComponent()
		...useDialogPluginComponent.emits,
	]);

	function onConfirm() {
		onDialogOK();
	}

	function onCancel() {
		onDialogCancel();
	}
</script>
