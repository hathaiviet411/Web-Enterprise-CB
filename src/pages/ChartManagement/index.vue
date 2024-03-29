<template>
	<div class="chart-screen">
		<v-app>
			<v-row>
				<v-col lg="3" sm="6" class="total-idea">
					<v-card>
						<v-btn block color="#F1DE94" class="darken-1">
							<v-icon left>fas fa-lightbulb</v-icon>
							<span>{{ 'Total Idea: ' + totalIdea }}</span>
						</v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6" class="total-user">
					<v-card>
						<v-btn block color="#C32424D0" class="darken-1">
							<v-icon left color="white">fas fa-users</v-icon>
							<span class="text-white">{{ 'Total User: ' + totalUser }}</span>
						</v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6" class="total-department">
					<v-card>
						<v-btn block color="#8479E1" class="darken-1">
							<v-icon left color="white">fas fa-building</v-icon>
							<span class="text-white">{{ 'Total Department: ' + totalDepartment }}</span>
						</v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6" class="total-category">
					<v-card>
						<v-btn block color="#A3E4DB" class="darken-1">
							<v-icon left>fas fa-books</v-icon>
							<span>{{ 'Total Category: ' + totalCategory }}</span>
						</v-btn>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="6" class="like-per-idea-chart">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-thumbs-up</v-icon>
							<span>Top 5 Ideas Have The Most Likes</span>
							<canvas id="barChartLike" />
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="6" class="dislike-per-idea-chart">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-thumbs-down</v-icon>
							<span>Top 5 Ideas Have The Most Dislikes</span>
							<canvas id="barChartDislike" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="12" class="category-trending-chart">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-analytics</v-icon>
							<span>Category Trending</span>
							<canvas id="doughnutChart" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="6" class="view-per-idea-chart">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-telescope</v-icon>
							<span>Top 5 Ideas Have The Most Views</span>
							<canvas id="barChartView" />
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="6" class="comment-per-idea-chart">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-comment-alt</v-icon>
							<span>Top 5 Ideas Have The Most Comments</span>
							<canvas id="barChartComment" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-app>
	</div>
</template>

<script>
import Chartjs from 'chart.js';

import { getListIdeaHaveMostLike, getListIdeaHaveMostView } from '@/api/modules/chart';

const urlAPI = {
    apiGetListIdeaHaveMostLike: '/chart/list-ideas-have-most-like',
    apiGetListIdeaHaveMostView: '/chart/list-ideas-have-most-view',
};

export default {
    name: 'ChartManagementIndex',
    data() {
        return {};
    },

    computed: {
        totalIdea() {
            return this.$store.getters.totalIdea;
        },

        totalUser() {
            return this.$store.getters.totalUser;
        },

        totalDepartment() {
            return this.$store.getters.totalDepartment;
        },

        totalCategory() {
            return this.$store.getters.totalCategory;
        },
    },

    mounted() {
        this.initialData();
    },

    created() {
        this.getChartIdeaHaveMostLike();
        this.getChartIdeaHaveMostView();
    },

    methods: {
        initialData() {
            this.initialBarChartDislike();
            this.initialDoughnutChart();
            this.initialBarChartComment();
        },

        async getChartIdeaHaveMostLike() {
            const response = await getListIdeaHaveMostLike(urlAPI.apiGetListIdeaHaveMostLike);

            const listLabel = [];
            const listData = [];

            if (response.status === true) {
                for (let i = 0; i < response.data.idea.length; i++) {
                    listLabel.push(response.data.idea[i].label);
                    listData.push(response.data.idea[i].likes);
                }
            }

            const ctx = document.getElementById('barChartLike').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: listLabel,
                    datasets: [
                        {
                            label: 'Likes',
                            data: listData,
                            backgroundColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            borderColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            responsive: true,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },

        initialBarChartDislike() {
            const ctx = document.getElementById('barChartDislike').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Idea 1',
                        'Idea 2',
                        'Idea 3',
                        'Idea 4',
                        'Idea 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of Dislike / Idea',
                            data: [12, 19, 3, 5, 2, 3, 20, 3, 1, 12],
                            backgroundColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            borderColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            responsive: true,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },

        initialBarChartComment() {
            const ctx = document.getElementById('barChartComment').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Idea 1',
                        'Idea 2',
                        'Idea 3',
                        'Idea 4',
                        'Idea 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of Comment / Idea',
                            data: [12, 19, 3, 5, 2, 3, 20, 3, 1, 12],
                            backgroundColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            borderColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            responsive: true,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },

        initialDoughnutChart() {
            const ctx = document.getElementById('doughnutChart').getContext('2d');
            new Chartjs(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Phone', 'Education', 'Entertainment'],
                    datasets: [
                        {
                            fill: true,
                            data: [40, 50, 100],
                            backgroundColor: [
                                '#EF6D6D',
                                '#8479E1',
                                '#FFD93D',
                            ],
                            pointBackgroundColor: [
                                '#EF6D6D',
                                '#8479E1',
                                '#FFD93D',
                            ],
                            responsive: true,
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(54, 162, 235)',
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },

        async getChartIdeaHaveMostView() {
            const response = await getListIdeaHaveMostView(urlAPI.apiGetListIdeaHaveMostView);

            const listLabel = [];
            const listData = [];

            if (response.status === true) {
                for (let i = 0; i < response.data.idea.length; i++) {
                    listLabel.push(response.data.idea[i].label);
                    listData.push(response.data.idea[i].views);
                }
            }

            const ctx = document.getElementById('barChartView').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: listLabel,
                    datasets: [
                        {
                            label: 'Views',
                            data: listData,
                            backgroundColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            borderColor: [
                                '#EF6D6D',
                                '#A3E4DB',
                                '#8479E1',
                                '#FFD93D',
                                '#65C18C',
                            ],
                            responsive: true,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
