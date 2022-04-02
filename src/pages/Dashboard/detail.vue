<template>
	<div>
		<b-overlay
			:show="overlay.show"
			:variant="overlay.variant"
			:opacity="overlay.opacity"
			:blur="overlay.blur"
			:rounded="overlay.sm"
		>
			<template #overlay>
				<div class="text-center overlay-card">
					<b-icon icon="arrow-clockwise" color="#7366FF" font-scale="3" animation="spin" />
					<p style="margin-top: 10px; color:#7366FF">{{ 'Xin vui lòng chờ' }}</p>
				</div>
			</template>

			<v-card elevation="24" class="rounded-lg mx-auto" max-width="1000px">
				<v-card-title>
					<v-row>
						<v-col cols="12" lg="1" class="text-center">
							<v-badge dot bottom color="green" offset-y="10" offset-x="10">
								<v-avatar size="50">
									<v-img
										min-width="40"
										min-height="40"
										max-width="60"
										max-height="60"
										contain
										class="rounded-circle"
										src="@/assets/images/default_avatar.png"
									/>
								</v-avatar>
							</v-badge>
						</v-col>

						<v-col cols="12" lg="3">
							<div class="author-info">
								<span class="author-name">{{ DATA.idea.user.name + ' - ' + DATA.idea.user.username }}</span>
								<br>
								<span class="uploaded-time">{{ DATA.idea.createdAt | moment('from') }}
									<span>·</span>
									<v-icon class="pl-1" color="#999" small>mdi-earth</v-icon>
								</span>
							</div>
						</v-col>

						<v-col cols="12" lg="8" class="text-center">
							<v-row>
								<v-col cols="12" lg="5">
									<span class="text-small">
										<strong>
											<i class="fas fa-building mr-3" />Department:
										</strong>
										{{ DATA.idea.department.departmentName }}
									</span>
								</v-col>

								<v-col cols="12" lg="5" class="text-center">
									<span class="text-small">
										<strong>
											<i class="fas fa-box-open mr-3" />Category:
										</strong>
										{{ DATA.idea.category.categoryName }}
									</span>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-title>

				<v-card-text v-if="DATA.idea.ideaPicture" class="content">
					<v-row>
						<v-col cols="12">
							<h5 class="post-content ml-3">{{ DATA.idea.ideaTitle }}</h5>
						</v-col>
						<v-col cols="12">
							<h5 class="post-content ml-3">{{ DATA.idea.ideaContent }}</h5>
						</v-col>
					</v-row>

					<div class="text-center">
						<v-img
							width="1168"
							height="472"
							contain
							:src="DATA.idea.ideaPicture"
						/>
					</div>
				</v-card-text>

				<v-card-text v-else class="random-background" :style="setBg()">
					<div class="text-center">
						<v-row>
							<v-col cols="12">
								<h5 class="post-content">{{ DATA.idea.ideaTitle }}</h5>
							</v-col>
							<v-col cols="12">
								<h5 class="post-content">{{ DATA.idea.ideaContent }}</h5>
							</v-col>
						</v-row>
					</div>
				</v-card-text>

				<v-card-actions>
					<v-row class="mt-3">
						<v-col cols="3" lg="3" class="text-center">
							<span class="like-total text-underline">{{ totalLikes + ' likes' }}</span>
						</v-col>

						<v-col cols="3" lg="3" class="text-center">
							<span class="comment-total text-underline">{{ DATA.idea.viewCount + ' views' }}</span>
						</v-col>

						<v-col cols="3" lg="3" class="text-center">
							<span class="comment-total text-underline">{{ (DATA.comments.length === 0 ? 0 : (post.comments.length + 1)) + ' comments' }}</span>
						</v-col>

						<v-col cols="3" lg="3" class="text-center">
							<span class="share-total text-underline mr-3">{{ totalDislikes + ' dislike' }}</span>
						</v-col>
					</v-row>
				</v-card-actions>

				<v-divider class="mr-3 ml-3" />

				<v-row class="ml-1">
					<v-col cols="3" lg="4" class="text-center pl-0 pr-0">
						<v-btn v-if="isLiked === true" x-small class="card-button" @click.prevent="handleUnLike()">
							<v-icon color="blue" small>mdi-thumb-up</v-icon>
							<span class="button-text">Like</span>
						</v-btn>
						<v-btn v-else x-small class="card-button" @click.prevent="handleLike()">
							<v-icon color="black" small>mdi-thumb-up</v-icon>
							<span class="button-text">Like</span>
						</v-btn>
					</v-col>

					<v-col cols="4" lg="4" class="text-center pl-0 pr-0">
						<v-btn x-small class="card-button" @click="isShowCommentSector = !isShowCommentSector">
							<v-icon small>mdi-message</v-icon>
							<span class="button-text">Comment</span>
						</v-btn>
					</v-col>

					<v-col cols="4" lg="4" class="text-center pl-0 pr-0">
						<v-btn v-if="isDisliked === true" x-small class="card-button" @click.prevent="handleUnDislike()">
							<v-icon color="red" small>mdi-thumb-down</v-icon>
							<span class="button-text">Dislike</span>
						</v-btn>

						<v-btn v-else x-small class="card-button" @click.prevent="handleDislike()">
							<v-icon color="black" small>mdi-thumb-down</v-icon>
							<span class="button-text">Dislike</span>
						</v-btn>
					</v-col>
				</v-row>

				<v-divider class="mr-3 ml-3" />

				<Transition appear name="fade" mode="in-out">
					<div v-if="isShowCommentSector">
						<v-row>
							<v-col cols="2" lg="1">
								<v-img
									min-width="50"
									min-height="50"
									max-width="60"
									max-height="60"
									contain
									class="rounded-circle ml-3"
									src="@/assets/images/default_avatar.png"
								/>
							</v-col>

							<v-col cols="10" lg="11">
								<v-text-field
									label="Write comment here..."
									filled
									hide-details
									rounded
									dense
									class="mr-3 ml-3"
								/>
							</v-col>
						</v-row>

						<div v-for="(comment, indexComment) in DATA.comments" :key="indexComment">
							<v-row>
								<v-col cols="2" lg="1">
									<v-img
										min-width="50"
										min-height="50"
										max-width="60"
										max-height="60"
										contain
										class="rounded-circle ml-3"
										:src="'https://joeschmoe.io/api/v1/random'"
									/>
								</v-col>

								<v-col cols="10" lg="11">
									<v-textarea
										readonly
										filled
										:label="comment.author"
										rounded
										dense
										hide-details
										rows="1"
										auto-grow
										class="mr-3 ml-3 comment-section"
										:value="comment.content"
									/>

									<div class="comment-section-button ml-6 mt-1">
										<span class="text-underline">Like</span>
										<span class="ml-3 text-underline">Trả lời</span>
										<span class="ml-3 text-underline">{{ comment.uploadedTime }}</span>
									</div>
								</v-col>
							</v-row>
						</div>

					</div>
				</Transition>
			</v-card>

		</b-overlay>
	</div>
</template>

<script>
import { getOneIdea } from '@/api/modules/idea';
import { postLike, deleteLike } from '@/api/modules/like';
import { postDislike, deleteDislike } from '@/api/modules/dislike';

const urlAPI = {
    apiGetListIdea: '/idea',
    apiPostLike: '/like',
    apiDeleteLike: '/unlike',
    apiPostDislike: '/dislike',
    apiDeleteDislike: '/undislike',
};

export default {
    name: 'IdeaManagementDetail',
    data() {
        return {
            id: this.$route.params.id,

            DATA: [],

            overlay: {
                show: false,
                variant: 'light',
                opacity: 1,
                blur: '1rem',
                rounded: 'sm',
            },

            isShowCommentSector: false,

            isLiked: false,
            isDisliked: false,

            totalLikes: '',
            totalDislikes: '',
        };
    },
    created() {
        this.getIdea();
    },
    methods: {
        async getIdea() {
            const URL = `${urlAPI.apiGetListIdea}/${this.$route.params.id}`;
            try {
                const response = await getOneIdea(URL);

                if (response.status === true) {
                    this.DATA = response.data;

                    this.isLiked = this.DATA.liked;
                    this.isDisked = this.DATA.disliked;

                    this.totalLikes = this.DATA.likes;
                    this.totalDislikes = this.DATA.dislikes;
                }
            } catch (error) {
                console.log(error);
            }
        },

        setBg() {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const style = '#' + randomColor;
            return `background-color: ${style}`;
        },

        async handleLike() {
            this.isLiked = true;

            if (this.isDisliked === true) {
                this.handleUnDislike();
            }

            try {
                const response = await postLike(urlAPI.apiPostLike, {
                    ideaId: this.id,
                });
                console.log(response);
                this.totalLikes = response.like;
            } catch (error) {
                console.log(error);
            }
        },

        async handleUnLike() {
            this.isLiked = false;

            try {
                const response = await deleteLike(`${urlAPI.apiDeleteLike}/${this.id}`);
                console.log(response);
                this.totalLikes = response.like;
            } catch (error) {
                console.log(error);
            }
        },

        async handleDislike() {
            this.isDisliked = true;

            if (this.isLiked === true) {
                this.handleUnLike();
            }

            try {
                const response = await postDislike(urlAPI.apiPostDislike, {
                    ideaId: this.id,
                });
                this.totalDislikes = response.dislike;
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },

        async handleUnDislike() {
            this.isDisliked = false;

            try {
                const response = await deleteDislike(`${urlAPI.apiDeleteDislike}/${this.id}`);
                this.totalDislikes = response.dislike;
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

.dashboard {
	background-image: url('/assets/images/background.png');
	background-repeat: no-repeat;
	background-size: auto;
}

.author-name {
	font-size: 14px;
	font-weight: bolder;
}

.uploaded-time {
	font-size: 14px;
	color: #999;
}

.content {
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: column;
	height: 472px;
}

.post-content {
	color: $black;
	line-height: 40px;
}

.like-total {
	font-size: 12px;
	color: #999;
}

.comment-total {
	font-size: 12px;
	color: #999;
}

.share-total {
	font-size: 12px;
	color: #999;
}

.text-underline:hover {
	text-decoration: underline;
}

.button-text {
	margin-left: 10px;
	font-size: 10px;
}

.card-button {
	height: 40px !important;
	box-shadow: none;
	border: 1px solid $white !important;
	background-color: #FFFFFF !important;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.comment-section-button {
	font-size: 12px;
}

.comment-section {
	font-size: 14px;
}

.btn-loading {
	opacity: .8;
}

.text-small {
	font-size: 12px;
}

.random-background {
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: column;
	height: 472px;
}

.overlay-card {
	margin-top: 100px;
}
</style>
