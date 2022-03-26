<template>
	<div class="dashboard">
		<v-subheader class="py-0 d-flex justify-space-between rounded-lg">
			<h3>Dashboard</h3>
			<v-btn color="success">
				View Analysis
			</v-btn>
		</v-subheader>
		<br>
		<v-row>
			<v-col lg="7" cols="12">
				<v-alert dense text type="success">
					Login Successfully! Welcome to <strong>Collect Idea System</strong>
				</v-alert>
				<v-row>
					<v-col v-for="(item,index) in activityLog" :key="index" lg="6" cols="12">
						<v-card elevation="2" class="rounded-lg">
							<v-card-text class="d-flex justify-space-between align-center">
								<div>
									<strong>{{ item.title }}</strong> <br>
									<span>Last 3 weeks</span>
								</div>
								<v-avatar size="88.5" :color="item.color" style="border: 3px solid #444">
									<span style="color: white">{{ item.amount }} +</span>
								</v-avatar>
							</v-card-text>
							<v-card-actions class="d-flex justify-space-between" />
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" lg="5">
				<v-card>
					<v-card-title>Activities</v-card-title>
					<v-card-text class="py-0">
						<v-timeline align-top dense>
							<v-timeline-item color="indigo" small>
								<strong>5 Minutes ago</strong>
								<div class="text-caption">
									You have new message please check this out
								</div>
							</v-timeline-item>

							<v-timeline-item color="green" small>
								<strong>35 Minutes ago</strong>
								<div class="text-caption">
									A Category has created!
								</div>
							</v-timeline-item>

							<v-timeline-item color="yellow" small>
								<strong>44 Minutes ago</strong>
								<div class="text-caption">
									A new idea has been added to Sport category!
								</div>
							</v-timeline-item>

							<v-timeline-item color="red" small>
								<strong>1,5 hours ago</strong>
								<div class="text-caption">
									An idea has been removed from Food category!
								</div>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<b-row v-for="(columns, index) in rowCount" :key="index" class="idea-loop mt-3">
			<b-col v-for="(column, indexColumn) in numberOfColumns" :key="indexColumn" sm="12" lg="3" md="4">
				<div v-if="data.length > layoutCount(columns, column) - 1">
					<v-card elevation="12">
						<v-card-title>
							<span>Idea title: {{ data[layoutCount(columns, column) - 1].ideaTitle }}</span>
						</v-card-title>
						<v-card-text>
							<b-row class="m-2">
								<span>Idea category: {{ data[layoutCount(columns, column) - 1].ideaCategory }} </span>
							</b-row>

							<b-row class="m-2">
								<span>Idea content: {{ data[layoutCount(columns, column) - 1].ideaContent }} </span>
							</b-row>

							<v-divider />

							<b-row class="m-2">
								<span>Idea uploaded date: {{ data[layoutCount(columns, column) - 1].ideaUploadDate }} </span>
							</b-row>

							<b-row class="m-2">
								<span>Idea author: {{ data[layoutCount(columns, column) - 1].ideaAuthor }} </span>
							</b-row>

							<v-divider />

							<b-row class="m-2">
								<span>Like {{ data[layoutCount(columns, column) - 1].ideaLike }}</span>
							</b-row>

							<b-row class="m-2">
								<span>Dislike {{ data[layoutCount(columns, column) - 1].ideaDislike }}</span>
							</b-row>

							<b-row class="m-2">
								<span>Comment {{ data[layoutCount(columns, column) - 1].ideaComment }}</span>
							</b-row>

							<b-row class="m-2">
								<span>Views: {{ data[layoutCount(columns, column) - 1].ideaView }} </span>
							</b-row>

						</v-card-text>

						<v-divider />

						<v-card-actions>
							<v-row>
								<v-col cols="3" lg="3" class="text-center">
									<v-btn
										elevation="6"
										icon
										class="m-1"
										large
										@click="onClickLikeButton(data[layoutCount(columns, column) - 1].id)"
									>
										<v-icon v-if="data[layoutCount(columns, column) - 1].isLiked === true">mdi-thumb-up</v-icon>
										<v-icon v-else>mdi-thumb-up-outline</v-icon>
									</v-btn>
								</v-col>

								<v-col cols="3" lg="3" class="text-center">
									<v-btn
										elevation="6"
										icon
										class="m-1"
										large
										@click="onClickDislikeButton(data[layoutCount(columns, column) - 1].id)"
									>
										<v-icon v-if="data[layoutCount(columns, column) - 1].isDisliked === true">mdi-thumb-down</v-icon>
										<v-icon v-else>mdi-thumb-down-outline</v-icon>
									</v-btn>
								</v-col>

								<v-col cols="3" lg="3" class="text-center">
									<v-btn elevation="6" icon class="m-1" large>
										<v-icon>mdi-eye-outline</v-icon>
									</v-btn>
								</v-col>

								<v-col cols="3" lg="3" class="text-center">
									<v-btn elevation="6" icon class="m-1" large>
										<v-icon>mdi-comment-text-outline</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-card>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
    idea_name: 'Dashboard',
    data() {
        return {
            activityLog: [
                { title: 'Total User', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3' },
                { title: 'Total Idea', amount: '245.7k', icon: 'mdi-account-group-outline', color: 'green darken-2' },
                { title: 'Total Category', amount: 237, icon: 'mdi-account-group-outline', color: 'blue-grey darken-1' },
                { title: 'Staffs', amount: 3433, icon: 'mdi-account-group-outline', color: 'deep-orange darken-1' },
            ],

            cat: '@/assets/images/idea_1.png',

            data: [
                {
                    id: 1,
                    ideaTitle: 'Cat',
                    ideaCategory: 'Entertainment',
                    ideaContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    ideaLike: 12,
                    ideaDislike: 1,
                    ideaView: 2,
                    ideaComment: 3,
                    ideaImgSrc: 'idea_1.png',
                    ideaAuthor: 'John Doe',
                    ideaUploadDate: '2020-03-01',
                    isLiked: false,
                    isDisliked: false,
                    isViewed: false,
                    isCommented: false,
                },
                {
                    id: 2,
                    ideaTitle: 'Cat 2',
                    ideaCategory: 'Entertainment',
                    ideaContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    ideaLike: 12,
                    ideaDislike: 1,
                    ideaView: 2,
                    ideaComment: 3,
                    ideaAuthor: 'John Doe',
                    ideaUploadDate: '2020-03-01',
                    isLiked: false,
                    isDisliked: false,
                    isViewed: false,
                    isCommented: false,
                },
                {
                    id: 3,
                    ideaTitle: 'Cat 3',
                    ideaCategory: 'Entertainment',
                    ideaContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    ideaLike: 12,
                    ideaDislike: 1,
                    ideaView: 2,
                    ideaComment: 3,
                    ideaAuthor: 'John Doe',
                    ideaUploadDate: '2020-03-01',
                    isLiked: false,
                    isDisliked: false,
                    isViewed: false,
                    isCommented: false,
                },
                {
                    id: 4,
                    ideaTitle: 'Cat 4',
                    ideaCategory: 'Entertainment',
                    ideaContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    ideaLike: 12,
                    ideaDislike: 1,
                    ideaView: 2,
                    ideaComment: 3,
                    ideaAuthor: 'John Doe',
                    ideaUploadDate: '2020-03-01',
                    isLiked: false,
                    isDisliked: false,
                    isViewed: false,
                    isCommented: false,
                },
            ],
            numberOfColumns: 4,
        };
    },
    computed: {
        rowCount() {
            return Math.floor(((this.data.length - 1) / this.numberOfColumns)) + 1;
        },
    },
    created() {
        this.increaseView();
    },
    methods: {
        onButtonClick(item) {
            console.log('click on ' + item.no);
        },
        layoutCount(rows, columns) {
            return (rows - 1) * this.numberOfColumns + columns;
        },
        onClickLikeButton(id) {
            this.data[id - 1].isLiked = !this.data[id].isLiked;
            this.data[id - 1].isDisliked = false;

            this.data[id - 1].ideaLike += 1;
            this.data[id - 1].ideaDislike -= 1;
        },
        onClickDislikeButton(id) {
            this.data[id - 1].isDisliked = !this.data[id].isDisliked;
            this.data[id - 1].isLiked = false;

            this.data[id - 1].ideaDislike += 1;
            this.data[id - 1].ideaLike -= 1;
        },
        increaseView() {
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].ideaView += 1;
            }
        },
    },
};
</script>

<style scoped>
    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }
</style>
