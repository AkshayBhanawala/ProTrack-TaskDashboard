<template>
	<q-layout view="hHr lpR ffr">
		<HeaderMain />

		<div class="menu-side-bar-drawer">
			<!-- <q-drawer
			show-if-above
			side="left"
			:mini="leftSideBarState.isMiniMode"
			bordered
			:breakpoint="leftSideBarState.mobileScreenBreakPoint"
			v-model:model-value="leftSideBarState.isOpen"
			@update:model-value="(state) => leftSideBarState.setOpen(state)"
		> -->
			<q-drawer
				show-if-above
				side="left"
				bordered
				v-model:model-value="leftSideBarState.isOpen"
				@update:model-value="(state) => leftSideBarState.setOpen(state)"
			>
				<MenuSideBar />
			</q-drawer>
		</div>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-drawer
			side="right"
			overlay
			behavior="mobile"
			elevated
			v-model:model-value="rightSideBarState.isOpen"
			@update:model-value="(state) => rightSideBarState.setOpen(state)"
		>
			<!-- drawer content -->
		</q-drawer>

		<!-- <FooterMain /> -->
	</q-layout>
</template>

<script setup lang="ts">
	import FooterMain from '@/components/FooterMain.component.vue';
	import HeaderMain from '@/components/HeaderMain.component.vue';
	import MenuSideBar from '@/components/MenuSideBar.component.vue';
	import { useLeftSideBarState, useRightSideBarState } from 'src/stores/store';

	defineOptions({
		name: 'MainLayout',
		components: {
			HeaderMain,
			FooterMain,
			MenuSideBar,
		},
	});

	const leftSideBarState = useLeftSideBarState();
	const rightSideBarState = useRightSideBarState();
</script>

<style scoped lang="scss">
	.menu-side-bar-drawer {
		:deep() {
			.q-drawer.q-drawer--bordered.q-drawer--mobile.fixed {
				border: none;
			}
		}
	}
</style>
