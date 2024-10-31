<template>
	<div class="menu-side-bar-wrapper">
		<section>
			<div class="row inline justify-center items-center logo-wrapper" style="gap: 15px">
				<q-avatar class="logo-mono-white-no-circle">
					<img src="images/logo-mono-white-no-circle.svg" alt="Avatar" />
				</q-avatar>
				<div class="header1">ProTrack</div>
			</div>
			<hr class="invisible" />
			<nav>
				<q-tabs v-model="tab" vertical inline-label indicator-color="primary" active-color="white" content-class="menu-side-bar">
					<q-route-tab name="Home" label="Home" to="/" exact icon="sym_r_grid_view" />
					<q-route-tab name="Calendar" label="Calendar" to="/" exact icon="sym_r_calendar_month" />
					<q-route-tab name="Tasks" label="Tasks" to="/" exact icon="sym_r_checklist" />
					<q-route-tab name="Notes" label="Notes" to="/" exact icon="sym_r_note_stack" />
				</q-tabs>
			</nav>
			<hr class="q-mt-md q-mb-xl" />
			<div class="upgrade-to-pro-wrapper">
				<div class="decorative-logo">
					<img src="images/logo-mono-white-no-circle.svg" alt="Avatar" />
				</div>
				<div class="header3">Upgrade to PRO</div>
				<div>
					<p>to get access too all features!</p>
					<p>Connect with ProTrack World!</p>
				</div>
			</div>
		</section>
		<section>
			<AccountInfoCard />
		</section>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	import ToolTip from './ToolTip.component.vue';

	import AccountInfoCard from '@/components/AccountInfoCard.component.vue';

	defineOptions({
		name: 'MenuSideBar',
		components: {
			ToolTip,
		},
	});

	const tab = ref('Home');
</script>

<style scoped lang="scss">
	.menu-side-bar-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 30px;
		padding-top: 22.5px;

		> * {
			width: 100%;
		}

		.logo-wrapper {
			&::before {
				z-index: -1;
				display: block;
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 90px;
				background: $header-bg-gradient-color1;
				background: $header-bg-gradient;
			}

			.header1 {
				color: $background;
			}
		}
		nav {
			padding: 20px 0px;
			:deep() {
				.menu-side-bar {
					display: flex !important;
					flex-direction: column;
				}
				.q-tab {
					padding-left: 20px;
					justify-content: flex-start;
					border-radius: 12px;

					.q-icon {
						font-size: 24px;
					}

					.q-tab__label {
						text-transform: capitalize;
					}

					.q-tab__indicator {
						z-index: -1;
						width: 100%;
						border-radius: 12px;
					}
				}
			}
		}

		.upgrade-to-pro-wrapper {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			line-height: 180%;
			border-radius: 30px;
			margin-top: 100px;
			padding-top: 70px;
			padding-bottom: 30px;
			cursor: pointer;
			color: $background;
			background: $tertiary;
			background: linear-gradient(180deg, rgba($tertiary, 1) 0%, rgba($tertiary, 0.33) 100%);

			.decorative-logo {
				position: absolute;
				top: calc(0px - 100% / 2.8 / (2.8 / 2));
				display: flex;
				justify-content: center;
				width: calc(100% / 2.8);
				border-radius: 50%;
				background-color: $background;
				overflow: hidden;
				box-shadow: 0px 24px 73px 0px rgba(0, 0, 0, 0.1);

				&::before {
					z-index: 0;
					content: '';
					position: absolute;
					top: 0px;
					left: 0;
					width: 100%;
					height: 100%;
					transform: scale(0.9);
					transform-origin: center;
					border-radius: 50%;
					background: $tertiary;
					background: linear-gradient(180deg, rgba($tertiary, 1) 0%, rgba($tertiary, 0.33) 100%);
				}
				img {
					z-index: 1;
				}
			}

			p {
				margin: 0;
			}
		}
	}
</style>
