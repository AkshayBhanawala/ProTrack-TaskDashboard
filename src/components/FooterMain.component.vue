<template>
	<q-footer bordered class="row justify-between items-center">
		<div class="row items-center full-height justify-center" style="gap: 10px">
			<q-avatar class="logo-mono-white-no-circle logo-icon footer-logo row items-center full-height justify-center">
				<img src="images/logo-mono-white-no-circle.svg" alt="Avatar" />
			</q-avatar>
			<div class="header1 logo-text">ProTrack</div>
		</div>
		<div class="header3">Made in India with ❤️ &nbsp; {{ currentYear }}</div>
		<div class="developer">
			<div class="wrapper">
				<div class="header3">Developed by</div>
				<div class="header1 name">
					<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/TH3-AZ/" class=""> TH3-AZ </a>
				</div>
			</div>
		</div>
	</q-footer>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'FooterMain',
	});
	const currentYear = new Date().getFullYear();
</script>

<style scoped lang="scss">
	.q-footer {
		z-index: -1;
		position: fixed;
		flex-wrap: nowrap;
		gap: 10px;
		bottom: 0;
		height: 120px;
		padding: 20px;
		color: $background;
		background-color: $text;
		background: linear-gradient(180deg, $text 0%, scale-color($secondary, $lightness: 50%) 100%);

		&:before {
			position: absolute;
			top: -100%;
			left: 0;
			display: block;
			content: '';
			height: 100%;
			width: 100%;
			background-color: $text;
		}

		> * {
			flex-basis: 100%;
			justify-content: center;
			text-align: center;

			&:first-child {
				justify-content: flex-start;
				text-align: left;
			}
			&:last-child {
				justify-content: flex-end;
				text-align: right;
			}
		}
		@media (max-width: $breakpoint-xs) {
			.logo-text {
				display: none;
			}
			> * {
				flex-basis: auto;
			}
		}

		.footer-logo {
			height: 100%;
			width: min-content;
			line-height: 1;

			:deep() {
				.q-avatar__content {
					height: 90%;
				}
			}
		}
		.logo-text {
			font-size: 3rem;
		}

		.developer {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;

			.wrapper {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;
				padding: 10px;
				background-color: $text;
				border-radius: 10px;
				line-height: 1;
			}

			.name {
				text-align: right;
				a {
					font-size: 20px;
					font-weight: 800 !important;
					letter-spacing: 5px;
					background: #12c2e9;
					background: linear-gradient(90deg, #f64f59, #c471ed, #12c2e9);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					text-decoration: none;
				}
			}
		}
	}
</style>
