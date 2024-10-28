<template>
	<q-card class="notes-section">
		<q-card-section vertical class="row justify-between items-center q-py-sm q-px-none">
			<span class="header2 title">Notes</span>
			<div class="header-actions">
				<q-btn unelevated dense rounded icon="sym_r_add" class="color-primary add-btn">
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
			<swiper-slide v-for="(note, i) in getNotes()" :key="i" :index="i" class="note-card">
				<q-card-section horizontal class="note-section-top">
					<div class="note">
						<div class="content">
							<div class="header3 note-label">{{ note?.label }}</div>
							<q-input borderless dense autogrow readonly class="note-description" v-model="note.description" />
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
						<q-btn outline dense rounded icon="sym_r_expand_content" class="color-secondary">
							<ToolTip text="Expand" />
						</q-btn>
					</q-card-actions>
				</q-card-section>
			</swiper-slide>
		</swiper-container>
	</q-card>
</template>
<script setup lang="ts">
	import moment from 'moment';
	import { QCardSection } from 'quasar';
	import { SwiperContainer, register } from 'swiper/element/bundle';
	import { ref } from 'vue';
	import { Note } from '../../models';
	import ToolTip from '../ToolTip.vue';

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

	function getNotes(): Note[] {
		const note1 = new Note(
			'Follow Up with Mr. Ashton',
			'Following up on our meeting with Mr. Ashton, I wanted to recap the key points discussed and outline the action items moving forward. During the meeting, we touched upon the project timeline, budget considerations, and specific deliverables. Mr. Ashton expressed particular interest in our innovative solutions and requested a detailed proposal by next week. He emphasized the importance of maintaining regular communication and setting up bi-weekly progress reviews.',
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);
		note1.attachments = [
			{ fileName: 'Screenshot Information.png', thumbnail: 'https://picsum.photos/100/75', src: 'https://picsum.photos/1000/750' },
			{ fileName: 'Important Information.png', thumbnail: 'https://picsum.photos/101/76', src: 'https://picsum.photos/1000/750' },
			{ fileName: 'Some More Information.png', thumbnail: 'https://picsum.photos/102/77', src: 'https://picsum.photos/1000/750' },
			{ fileName: 'Just Another Information.png', thumbnail: 'https://picsum.photos/103/78', src: 'https://picsum.photos/1000/750' },
		];

		const note2 = new Note(
			'Setlist for Hackathon',
			'- Project Timeline\n- Budget Considerations\n- Specific Deliverables\n- Additional Features for Software Solution\n- Detailed Proposal for Review\n- Prepare the PPT\n- Review by Ravi\n- GD\n- The Grand Finale',
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);
		note2.date = moment().subtract(Math.floor(Math.random() * 30), 'days');

		const note3 = new Note(
			'Auroras and Sad Prose',
			"In the twilight of northern skies,\nAuroras dance with gentle grace.\nWhile down below, a heart still cries,\nLonging words leave empty space.\n\nColors swirl in cosmic streams,\nNature's poetry in the night.\nReality blends into dreams,\nAs sadness turns to pure delight.",
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);

		const note4 = new Note(
			'Recipe: Classic Tiramisu',
			'Ingredients:\n- 6 egg yolks\n- 1 cup sugar\n- 1¼ cup mascarpone cheese\n- 1¾ cup heavy whipping cream\n- 2 packages ladyfingers\n- 1 cup cold espresso\n- ½ cup coffee liqueur\n- 1 tbsp cocoa powder\n\nInstructions:\n1. Mix yolks & sugar\n2. Add mascarpone & whipped cream\n3. Dip ladyfingers in coffee mixture\n4. Layer & refrigerate overnight\n5. Dust with cocoa before serving',
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);

		const note5 = new Note(
			'Book Notes: The Psychology of Money',
			'Key Takeaways:\n\n1. Wealth is hidden - it\'s the money not spent\n2. Compounding is about time, not returns\n3. Room for error is more important than returns\n4. Luck and risk are siblings\n5. Save money to gain control over time\n\nQuote: "Building wealth has little to do with your income or investment returns, and lots to do with your savings rate."',
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);
		note5.attachments = [
			{ fileName: 'The Psychology of Money.png', thumbnail: 'https://picsum.photos/104/79', src: 'https://picsum.photos/1000/750' },
		];

		const note6 = new Note(
			'Garden Planning 2024',
			'Spring Planting Schedule:\n\nMarch:\n- Start tomatoes indoors\n- Plant peas and spinach\n\nApril:\n- Plant potatoes\n- Start herbs\n\nMay:\n- Transfer tomatoes outside\n- Plant cucumbers and zucchini\n\nRemember to:\n- Check soil pH\n- Set up irrigation system\n- Order organic fertilizer',
			moment().subtract(Math.floor(Math.random() * 30), 'days')
		);

		return [note1, note2, note3, note4, note5, note6];
	}

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
