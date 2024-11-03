<template>
	<q-layout view="hHr lpR ffr" class="main-layout">
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
				:breakpoint="1400"
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
	import { useLeftSideBarStore, useRightSideBarStore } from 'src/stores/store';

	defineOptions({
		name: 'MainLayout',
		components: {
			HeaderMain,
			FooterMain,
			MenuSideBar,
		},
	});

	const leftSideBarState = useLeftSideBarStore();
	const rightSideBarState = useRightSideBarStore();
</script>

<style scoped lang="scss">
	.main-layout {
		max-height: 100vh;
	}
	.menu-side-bar-drawer {
		:deep() {
			.q-drawer.q-drawer--bordered.q-drawer--mobile.fixed {
				border: none;
			}
			.q-drawer.q-drawer--bordered.q-drawer--standard {
				position: fixed;
				top: 0px !important;
			}
		}
	}
	:deep() {
		.q-drawer__opener.fixed-right + .q-drawer__backdrop:not(.hidden) + .q-drawer--right {
			overflow: hidden;
			box-sizing: content-box;
			background-color: $background;
			box-shadow: 0px 0px 20px -5px rgba(0, 32, 43, 0.8);
			border-radius: 30px;
			border: 4px solid rgba($separator-color, 1);
			outline: 4px solid rgba($separator-color, 0.4);
			margin-right: 20px;
		}
	}
</style>
