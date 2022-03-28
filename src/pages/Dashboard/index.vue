<template>
	<div class="dashboard">
		<v-row>
			<v-col v-for="(post, index) in DATA" :key="index" cols="12">
				<v-card id="cat" elevation="20" class="rounded-lg mx-auto" max-width="1000px">
					<v-card-title>
						<v-row>
							<v-col cols="12" lg="1" class="text-center">
								<v-img
									min-width="40"
									min-height="40"
									max-width="60"
									max-height="60"
									contain
									class="rounded-circle"
									:src="post.avatar"
								/>
							</v-col>

							<v-col cols="12" lg="3">
								<div class="author-info">
									<span class="author-name">{{ post.user.name + ' - ' + post.user.username }}</span>
									<br>
									<span class="uploaded-time">{{ post.uploadedTime }}
										<span>·</span>
										<v-icon class="pl-1" color="#999" small>mdi-earth</v-icon>
									</span>
								</div>
							</v-col>

							<v-col cols="12" lg="8" class="text-align: right;">
								<v-row>
									<v-col cols="12" lg="5">
										<span class="text-small">Department: {{ post.department }}</span>
									</v-col>

									<v-col cols="12" lg="5">
										<span class="text-small">Category: {{ post.category }}</span>
									</v-col>

									<v-col cols="12" lg="2">
										<v-btn class="mx-2" fab dark small color="#7366FF" style="float: right;">
											<v-icon dark>mdi-dots-horizontal</v-icon>
										</v-btn>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-card-title>

					<v-card-text v-if="post.ideaPicture" class="content">
						<v-row>
							<v-col cols="12">
								<h5 class="post-content ml-3">{{ post.ideaContent }}</h5>
							</v-col>
						</v-row>

						<div class="text-center">
							<v-img
								width="1168"
								height="472"
								contain
								:src="post.ideaPicture"
							/>
						</div>
					</v-card-text>

					<v-card-text v-else class="random-background" :style="setBg()">
						<div class="text-center">
							<h5 class="post-content ml-3">{{ post.ideaContent }}</h5>
						</div>
					</v-card-text>

					<v-card-actions>
						<v-row>
							<v-col cols="3" lg="6">
								<v-icon color="red" class="p-1" style="margin-bottom: 2px;">mdi-heart</v-icon>
								<span class="like-total text-underline">{{ post.likes + ' yêu thích' }}</span>
							</v-col>

							<v-col cols="3" lg="2" class="pr-0 pl-0">
								<div style="float: right;">
									<v-icon class="p-1">mdi-eye</v-icon>
									<span class="comment-total text-underline">{{ post.viewCount + ' lượt xem' }}</span>
								</div>
							</v-col>

							<v-col cols="3" lg="2" class="pr-0 pl-0">
								<div style="float: right;">
									<v-icon class="p-1">mdi-message</v-icon>
									<span class="comment-total text-underline">{{ (post.comments.length === 0 ? 0 : (post.comments.length + 1)) + ' bình luận' }}</span>
								</div>
							</v-col>

							<v-col cols="3" lg="2">
								<div style="float: right;">
									<v-icon class="p-1" style="margin-bottom: 2px;">mdi-share</v-icon>
									<span class="share-total text-underline mr-3">{{ 411 + ' chia sẻ' }}</span>
								</div>
							</v-col>
						</v-row>
					</v-card-actions>

					<v-divider class="mr-3 ml-3" />

					<v-row class="ml-1">
						<v-col cols="3" lg="4" class="text-center">
							<v-btn x-small class="card-button">
								<v-icon small>mdi-thumb-up</v-icon>
								<span class="button-text">Thích</span>
							</v-btn>
						</v-col>

						<v-col cols="4" lg="4" class="text-center">
							<v-btn x-small class="card-button" @click="isShowCommentSector = !isShowCommentSector">
								<v-icon small>mdi-message</v-icon>
								<span class="button-text">Bình luận</span>
							</v-btn>
						</v-col>

						<v-col cols="4" lg="4" class="text-center">
							<v-btn x-small class="card-button">
								<v-icon small>mdi-share</v-icon>
								<span class="button-text">Chia sẻ</span>
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
										:src="post.avatar"
									/>
								</v-col>

								<v-col cols="10" lg="11">
									<v-text-field
										label="Viết bình luận..."
										filled
										hide-details
										rounded
										dense
										class="mr-3 ml-3"
									/>
								</v-col>
							</v-row>

							<div v-for="(comment, indexComment) in post.comments" :key="indexComment">
								<v-row>
									<v-col cols="2" lg="1">
										<v-img
											min-width="50"
											min-height="50"
											max-width="60"
											max-height="60"
											contain
											class="rounded-circle ml-3"
											:src="comment.avatar"
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
			</v-col>

			<!-- <div v-if="DATA.length" v-observe-visibility="handleScrolledBottom" />

			<v-col v-if="isLoading === true" cols="12" class="text-center">
				<v-btn class="btn-loading rounded-xl" elevation="12" color="#7366FF">
					<b-icon style="color: #FFFFFF" icon="arrow-clockwise" animation="spin-pulse" font-scale="2" />
					<span style="color: #FFFFFF">Loading...</span>
				</v-btn>
			</v-col> -->
		</v-row>
	</div>
</template>

<script>
import { getListIdea } from '@/api/modules/idea';

const apiGetListIdea = '/idea?page=';

export default {
    name: 'Dashboard',
    data() {
        return {
            DATA: [],

            isShowCommentSector: false,

            user: {
                comment: '',
                like: '',
                view: '',
                dislike: '',
            },

            page: 1,
            totalPage: 1,

            // isLoading: false,
        };
    },
    watch: {
        // isLoading(val) {
        //     val && setTimeout(() => {
        //         this.isLoading = false;
        //         this.getIdeaList();
        //     }, 3000);
        // },
    },
    created() {
        this.getIdeaList();
    },
    methods: {
        async getIdeaList() {
            this.isLoading = true;

            const URL = `${apiGetListIdea}${this.page}`;
            try {
                const response = await getListIdea(URL);

                if (response.status === true) {
                    this.DATA = response.data.ideas;
                    this.totalPage = response.totalPage;
                }
            } catch (error) {
                console.log(error);
            }

            this.isLoading = false;
        },

        setBg() {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const style = '#' + randomColor;
            return `background-color: ${style}`;
        },

        // handleScrolledBottom(isVisible) {
        //     if (!isVisible) {
        //         return;
        //     }

        //     this.page += 1;
        //     this.isLoading = true;
        // },
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
	font-size: 12px;
}

.card-button {
	height: 40px !important;
	box-shadow: none;
	border: 1px solid $white !important;
	background-color: #FFFFFF !important;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
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

</style>
