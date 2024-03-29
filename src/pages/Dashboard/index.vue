<template>
	<div class="dashboard-screen">
		<b-overlay
			:show="overlay.show"
			:variant="overlay.variant"
			:opacity="overlay.opacity"
			:blur="overlay.blur"
			:rounded="overlay.sm"
		>
			<template #overlay>
				<div class="text-center overlay-card">
					<b-icon
						icon="arrow-clockwise"
						color="#7366FF"
						font-scale="3"
						animation="spin"
					/>
					<p style="margin-top: 10px; color: #7366ff">
						{{ $t('DASHBOARD.PLEASE_WAIT') }}
					</p>
				</div>
			</template>

			<v-row class="dashboard-list-idea">
				<v-col v-for="(post, index) in DATA" :key="index" cols="12">
					<v-hover>
						<template v-slot:default="{ hover }">
							<v-card elevation="24" class="rounded-lg mx-auto" max-width="1000" @click="toDetailScreen(post._id)">
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
												<span class="author-name">{{ post.user.name + ' - ' + post.user.username }}</span>
												<br>
												<span class="uploaded-time">{{ post.createdAt | moment('from') }}
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
															<i class="fas fa-building mr-3" />
															<span>{{ $t('DASHBOARD.DEPARTMENT') }}:</span>
														</strong>
														{{ post.department.departmentName }}
													</span>
												</v-col>

												<v-col cols="12" lg="5" class="text-center">
													<span class="text-small">
														<strong>
															<i class="fas fa-box-open mr-3" />
															<span>{{ $t('DASHBOARD.CATEGORY') }}:</span>
														</strong>
														{{ post.category.categoryName }}
													</span>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-card-title>

								<v-fade-transition>
									<v-overlay
										v-if="hover"
										absolute
										color="#000000"
										:opacity=".5"
									>
										<v-btn color="#FFD154" @click.prevent="userReadIdea(post._id)">
											<span style="color: #002795; font-weight: bold;">
												{{ $t('DASHBOARD.SEE_MORE_INFO') }}
											</span>
										</v-btn>
									</v-overlay>
								</v-fade-transition>

								<v-card-text v-if="post.ideaPicture" class="content">
									<div class="text-center">
										<v-img
											max-width="100%"
											contain
											max-height="300"
											aspect-ratio="1"
											position="center center"
											:src="post.ideaPicture"
										/>
									</div>
								</v-card-text>

								<v-card-text v-else class="random-background" :style="`background-color: #3D3D3D;`">
									<div class="text-center">
										<v-row>
											<v-col cols="12">
												<h5 style="color: #FFD154;" class="post-content">{{ post.ideaTitle }}</h5>
											</v-col>
											<v-col cols="12">
												<h5 style="color: #FFD154;" class="post-content">{{ post.ideaContent }}</h5>
											</v-col>

											<v-col v-for="(file, indexFile) in post.ideaFile" :key="indexFile" cols="12">
												<span style="color: #FFD154;" class="post-content">{{ file.split('uploads/')[1] }}</span>
											</v-col>
										</v-row>
									</div>
								</v-card-text>
							</v-card>
						</template>
					</v-hover>
				</v-col>

				<div v-if="DATA.length" v-observe-visibility="handleScrolledBottom" />
			</v-row>

			<v-row v-if="isLastPage === false">
				<v-col v-if="isLoading === true" cols="12" class="text-center">
					<v-btn class="btn-loading rounded-xl" elevation="12" color="#7366FF">
						<b-icon
							style="color: #ffffff"
							icon="arrow-clockwise"
							animation="spin-pulse"
							font-scale="2"
						/>
						<span style="color: #ffffff">{{ $t('DASHBOARD.LOADING') }}</span>
					</v-btn>
				</v-col>
			</v-row>

			<v-row v-else>
				<v-col cols="12" class="text-center">
					<v-btn class="btn-loading rounded-xl" elevation="12" color="#7366FF">
						<b-icon
							style="color: #ffffff"
							icon="emoji-neutral"
							animation=""
							font-scale="2"
						/>
						<span style="color: #ffffff">{{ $t('DASHBOARD.NO_DATA') }}</span>
					</v-btn>
				</v-col>
			</v-row>
		</b-overlay>
	</div>
</template>

<script>
// Apis import
import { getAllIdea } from '@/api/modules/idea';

import socket from '@/socket/socket';

// Const APIs Url
const urlAPI = {
    apiGetListIdea: '/idea?page=',
};

export default {
    name: 'Dashboard',
    data() {
        return {
            DATA: [],

            isShowCommentSector: false,

            isClickLikeButton: false,

            user: {
                comment: '',
                like: '',
                view: '',
                dislike: '',
            },

            page: 1,
            totalPage: 1,

            overlay: {
                show: false,
                variant: 'light',
                opacity: 1,
                blur: '1rem',
                rounded: 'sm',
            },

            isLoading: false,

            isLastPage: false,
        };
    },
    created() {
        this.getIdeaList();
    },
    methods: {
        async getIdeaList() {
            this.overlay.show = true;

            const URL = `${urlAPI.apiGetListIdea}${this.page}`;
            try {
                const response = await getAllIdea(URL);

                if (response.status === true) {
                    this.DATA = response.data.ideas;
                    this.totalPage = response.data.totalPage;
                }
            } catch (error) {
                console.log(error);
            }

            this.overlay.show = false;
        },

        async handleScrolledBottom(isVisible) {
            this.isLoading = true;

            if (!isVisible) {
                return;
            }

            this.page += 1;
            this.isLoading = true;

            if (this.page <= this.totalPage) {
                this.isLastPage = false;
                const URL = `${urlAPI.apiGetListIdea}${this.page}`;
                try {
                    const response = await getAllIdea(URL);

                    if (response.status === true) {
                        for (let i = 0; i < response.data.ideas.length; i++) {
                            this.DATA.push(response.data.ideas[i]);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('No More Data');
                this.isLastPage = true;
            }

            this.isLoading = false;
        },

        userReadIdea(data) {
            const payload = {
                ideaId: data,
            };
            socket.emit('idea', payload);
        },

        toDetailScreen(id) {
            this.$router.push({ path: `/dashboard/detail/${id}` });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.dashboard {
  background-image: url("/assets/images/background.png");
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
  background-color: #ffffff !important;
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
  opacity: 0.8;
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
