<template>
	<q-card class="notes-section">
		<q-card-section vertical class="row justify-between items-center q-py-sm q-px-none">
			<span class="header2 title">Notes</span>
			<div class="header-actions">
				<q-btn unelevated dense rounded icon="sym_r_add" class="color-primary add-btn" @click="notifyToast_NotImplemented()">
					<ToolTip text="Add Note" />
				</q-btn>
				<q-btn outline dense rounded icon="sym_r_arrow_forward_ios" class="color-secondary next-btn" @click="nextNote()">
					<ToolTip text="Next" />
				</q-btn>
			</div>
		</q-card-section>

		<swiper-container
			ref="swiperRef"
			:autoHeight="false"
			:slidesPerView="'auto'"
			:centeredSlides="false"
			:spaceBetween="10"
			:navigation="false"
			:keyboard="true"
			:mousewheel="true"
			:loop="false"
			:autoplay-delay="5000"
			:autoplay-disable-on-interaction="true"
			:rewind="true"
			class="note-cards q-px-none"
		>
			<swiper-slide v-for="(note, i) in notes" :key="i" :index="i" class="note-card">
				<q-card-section horizontal class="note-section-top">
					<div class="note">
						<div class="content">
							<div class="header3 note-label">{{ note?.title }}</div>
							<q-input borderless dense autogrow readonly class="note-description" v-model="note.content" />
						</div>
						<div v-if="note?.attachments?.length" class="attachments">
							<div class="text-subtitle2">Attachments</div>
							<template v-for="(attachment, j) in note?.attachments" :key="j">
								<div v-if="j < 2" class="attachment">
									<q-img :src="attachment.thumbnail" :ratio="16 / 9" spinner-color="primary" spinner-size="80%" class="thumb" />
									<span class="attachment-name text-caption">{{ attachment.fileName }}</span>
								</div>
							</template>
							<div v-if="note?.attachments?.length > 2" class="text-subtitle2 attachment-more">+{{ note?.attachments?.length - 2 }} more</div>
						</div>
					</div>
				</q-card-section>

				<q-card-section horizontal class="note-section-bottom">
					<div class="subtext note-date">{{ note?.date?.format('DD MMM, YYYY') }}</div>
					<q-card-actions horizontal class="note-actions">
						<q-btn outline dense rounded icon="sym_r_expand_content" class="color-secondary" @click="notifyToast_NotImplemented()">
							<ToolTip text="Expand" />
						</q-btn>
					</q-card-actions>
				</q-card-section>
			</swiper-slide>
		</swiper-container>
	</q-card>
</template>

<script setup lang="ts">
	import { QCardSection } from 'quasar';
	import { register, SwiperContainer } from 'swiper/element/bundle';
	import { computed, onMounted, ref } from 'vue';

	import ToolTip from '@/components/ToolTip.component.vue';
	import { useNotesStore } from '@/stores/store';
	import { notifyToast_NotImplemented } from '@/utils/notification-toast.util';
	import { notesService } from 'src/services';
	register();

	defineOptions({
		name: 'TaskForTheDaySection',
		components: {
			ToolTip,
		},
	});

	withDefaults(defineProps<Props>(), {});

	interface Props {
		photoOnly?: boolean;
		noBorder?: boolean;
		noOnlineStatus?: boolean;
	}

	const swiperRef = ref<SwiperContainer>();

	const notesStore = useNotesStore();
	const notes = computed(() => {
		if (notesStore?.notes?.length) {
			return notesStore.notes;
		}
		return [];
	});

	onMounted(async () => {
		const serviceNotes = await notesService.fetchAllNotes();
		notesStore.setNotes(serviceNotes);
	});

	function nextNote() {
		swiperRef.value?.swiper?.slideNext();
	}
</script>

<style lang="scss">
	swiper-container {
		width: 100%;
		height: 100%;
	}

	swiper-slide {
		text-align: center;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
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
			margin-left: auto;

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
			gap: 16px;
			padding-top: 10px;
			padding-bottom: 20px;
			justify-content: flex-start;
			align-items: stretch;
			overflow-y: hidden;

			.note-card {
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				min-width: 250px;
				width: calc(100% / 3.11);
				height: auto;
				gap: 10px;
				padding: 15px;
				padding-bottom: 10px;
				border: 1px solid rgba($separator-color, 1);
				border-radius: 10px;
				overflow: hidden;
				background-color: white;

				> * {
					width: 100%;
				}

				.note-section-top {
					flex-grow: 1;
					justify-content: space-between;

					.note {
						flex-grow: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						gap: 10px;
						text-align: left;

						.content {
							display: flex;
							flex-direction: column;
							gap: 10px;
							align-items: stretch;

							:deep(.note-description) {
								padding-right: 10px;

								.q-field__native {
									display: -webkit-box;
									-webkit-box-orient: vertical;
									color: $subtext;
									padding: 0;
									max-height: 180px;
									overflow-y: hidden !important;
									line-clamp: 10;
									-webkit-line-clamp: 10;
									text-overflow: ellipsis;
								}
							}
						}

						.attachments {
							display: flex;
							flex-direction: column;
							gap: 10px;

							.text-subtitle2 {
								line-height: 1;
							}

							.attachment {
								position: relative;
								display: flex;
								flex-direction: row;
								justify-content: flex-start;
								align-items: center;
								gap: 5px;

								.thumb {
									width: 33%;
									flex-shrink: 0;
									border-radius: 8px;
								}
							}
						}
					}
				}

				.note-section-bottom {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					padding: 0;

					.note-date {
						font-size: 12px;
						opacity: 0.8;
						text-align: center;
					}

					.note-actions {
						padding: 0;
						justify-content: center;

						:deep(button) {
							height: 30px;
							width: 30px;
							border-radius: 10px;
							padding: 0;

							&.q-btn--outline:before {
								border-width: 2px;
							}
						}
					}
				}
			}
		}
	}
</style>
