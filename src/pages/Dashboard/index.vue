<template>
	<div class="dashboard">
		<v-row>
			<v-col v-for="(post, index) in DATA" :key="index" cols="12">
				<v-card elevation="20" class="rounded-lg mx-auto" max-width="800px">
					<v-card-title>
						<v-row>
							<v-col cols="2" lg="1" class="text-center">
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

							<v-col cols="8" lg="10">
								<div class="author-info">
									<span class="author-name">{{ post.author }}</span>
									<br>
									<span class="uploaded-time">{{ post.uploadedTime }}
										<span>·</span>
										<v-icon class="pl-1" color="#999" small>mdi-earth</v-icon>
									</span>
								</div>
							</v-col>

							<v-col cols="2" lg="1">
								<v-btn class="mx-2" fab dark small color="#7366FF" style="float: right;">
									<v-icon dark>mdi-dots-horizontal</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-card-title>

					<v-card-text class="content">
						<div class="text-center">
							<h4 class="post-content">Khung giờ vàng của tôi: 23h-4h sáng: <br> Chạy tất cả các deadline cùng 1 lúc.  <br> 🙃🙃🙃</h4>
						</div>
					</v-card-text>

					<v-card-actions>
						<v-row>
							<v-col cols="3" lg="8">
								<v-icon color="red" class="p-1" style="margin-bottom: 2px;">mdi-heart</v-icon>
								<span class="like-total text-underline">{{ post.likeTotal + 'K' }}</span>
							</v-col>

							<v-col cols="4" lg="2" class="pr-0 pl-0">
								<div style="float: right;">
									<v-icon class="p-1">mdi-message</v-icon>
									<span class="comment-total text-underline">{{ post.commentTotal + 'K' + ' bình luận' }}</span>
								</div>
							</v-col>

							<v-col cols="5" lg="2">
								<div style="float: right;">
									<v-icon class="p-1" style="margin-bottom: 2px;">mdi-share</v-icon>
									<span class="share-total text-underline mr-3">{{ post.shareTotal + ' chia sẻ' }}</span>
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
		</v-row>
	</div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            DATA: [
                {
                    id: 1,
                    author: 'Biết thế éo đi làm',
                    avatar: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/245215277_325485209338808_3583214672850400057_n.png?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bn5RHMAitl8AX9rWbht&_nc_ht=scontent.fhan5-6.fna&oh=00_AT-AGPHkEgezLvCitFX_UXNyI-QvDbT4T77KZsPt1WxLDQ&oe=6242F758',
                    uploadedTime: '23 phút',
                    content: 'Top các nghề hay bị dí Deadline: Kế toán, Marketing, Sale, IT, Designer, HR,.... và tất cả các ngành còn lại ở Việt Nam.',
                    image: '',
                    likeTotal: 15,
                    commentTotal: 63,
                    shareTotal: 131,
                    comments: [
                        {
                            id: 1,
                            author: 'Nghiệp quật đấyyy dmm?',
                            avatar: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/272800001_957227341847102_852898675806413068_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Sx5gRuWMcV0AX87eA76&_nc_ht=scontent.fhan5-11.fna&oh=00_AT9-Sn0uXH8HWoV4mYLxJ13QdxVDN41gEoEAeZMXL63I9A&oe=6242D845',
                            uploadedTime: '2 giờ',
                            content: 'Dù chỉ là designer thôi mà t tưởng bọn leader là mẹ t ấy ',
                            image: '',
                            reactionTotal: 131,
                        },
                        {
                            id: 2,
                            author: 'Trang Trang',
                            avatar: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/276141415_675164433569960_5349981220649122425_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=WKIME7nIVN8AX-FlLTO&_nc_ht=scontent.fhan5-6.fna&oh=00_AT_QlKmSRixCAfZn05FBICBVxrnFw0q0FMBCAeop7kPtwA&oe=62445AA3',
                            uploadedTime: '1 ngày',
                            content: 'Nếu mụt ngừi thứ 6 khóc trên cty thì tức là thứ 2 nên nộp đơn xin nghỉ việc, nhưng vẫn không nộp thì tức là họ nghèo vcl nên hèn 😃',
                            image: '',
                            reactionTotal: 72,
                        },
                        {
                            id: 3,
                            author: 'Ngọc Linh',
                            avatar: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/275297600_1394310004330418_1305950219585731961_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=-QQQ6LjJBi4AX8S9z72&_nc_oc=AQlOQUtrUkJNoXFOFBc6BAwjGkuwGwqSAv4sLCsUP2JIzLfmSXf3XmpMm86X8OUs7MA&_nc_ht=scontent.fhan5-6.fna&oh=00_AT8qGRRjRBJtHmqA6LoixshEcGxtbQERfVQqGj4tBXFivg&oe=6243182A',
                            uploadedTime: '1 ngày',
                            content: 'Mục tiêu ngủ trước 23h từ năm này qua năm khác không bao giờ thành hiện thực',
                            image: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/276131927_1404933626601389_1977106158637679823_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=dbeb18&_nc_ohc=ZC5A1SSXg1MAX-lFaxh&_nc_ht=scontent.fhan5-11.fna&oh=00_AT_LbOEDmqh-XEK6iYqXWVxqDKz4qvkSpEAiuLudfTmRYA&oe=62443DD7',
                            reactionTotal: 6,
                        },
                    ],
                },
            ],

            isShowCommentSector: false,

            user: {
                comment: '',
                like: '',
                view: '',
                dislike: '',
            },
        };
    },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

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
	background-color: #165348;
}

.post-content {
	color: $white;
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

</style>
