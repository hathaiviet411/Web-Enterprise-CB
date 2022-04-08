<template>
	<div class="chart-management">
		<v-app>
			<v-row>
				<v-col lg="3" sm="6">
					<v-card>
						<v-btn block color="#F1DE94" class="darken-1">
							<v-icon left>fas fa-lightbulb</v-icon>
							<span>Total Idea</span>
						</v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6">
					<v-card>
						<v-btn block color="#C32424D0" class="darken-1">
							<v-icon left>fas fa-users</v-icon>
							<span>Total User</span></v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6">
					<v-card>
						<v-btn block color="#8479E1" class="darken-1">
							<v-icon left>fas fa-building</v-icon>
							<span>Total Department</span></v-btn>
					</v-card>
				</v-col>

				<v-col lg="3" sm="6">
					<v-card>
						<v-btn block color="#A3E4DB" class="darken-1">
							<v-icon left>fas fa-books</v-icon>
							<span>Total Category</span></v-btn>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="6">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-thumbs-up</v-icon>
							<span>Number of Likes / Category</span>
							<canvas id="barChartLike" />
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="6">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-thumbs-down</v-icon>
							<span>Number of Dislikes / Category</span>
							<canvas id="barChartDislike" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="12">
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
				<v-col cols="6">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-telescope</v-icon>
							<span>Number of Views / Category</span>
							<canvas id="barChartView" />
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="6">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-comment-alt</v-icon>
							<span>Number of Comments / Category</span>
							<canvas id="barChartComment" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="12">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fas fa-lightbulb-on</v-icon>
							<span>Number of Idea Posted / Month</span>
							<canvas id="lineChartIdeaPosted" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-3">
				<v-col cols="12">
					<v-card>
						<v-card-text class="text-center">
							<v-icon left small>fad fa-book-alt</v-icon>
							<span>Number of Category Created / Month</span>
							<canvas id="lineChartCategoryCreated" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-app>
	</div>
</template>

<script>
import Chartjs from 'chart.js';
export default {
    name: 'ChartManagementIndex',
    data() {
        return {};
    },
    mounted() {
        this.initialBarChartLike();
        this.initialDoughnutChart();
        this.initialBarChartDislike();
        this.initialBarChartView();
        this.initialBarChartComment();
        this.initialLineChartIdeaPosted();
        this.initialLineChartCategoryCreated();
    },
    methods: {
        initialBarChartLike() {
            const ctx = document.getElementById('barChartLike').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Category 1',
                        'Category 2',
                        'Category 3',
                        'Category 4',
                        'Category 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of Likes / Category',
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
                        'Category 1',
                        'Category 2',
                        'Category 3',
                        'Category 4',
                        'Category 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of Dislike / Category',
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

        initialBarChartView() {
            const ctx = document.getElementById('barChartView').getContext('2d');
            new Chartjs(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Category 1',
                        'Category 2',
                        'Category 3',
                        'Category 4',
                        'Category 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of View / Category',
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
                        'Category 1',
                        'Category 2',
                        'Category 3',
                        'Category 4',
                        'Category 5',
                    ],
                    datasets: [
                        {
                            label: 'Number of Comment / Category',
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

        initialLineChartIdeaPosted() {
            const ctx = document.getElementById('lineChartIdeaPosted').getContext('2d');
            new Chartjs(ctx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Looping tension',
                        data: [65, 59, 80, 81, 26, 55, 40, 65, 59, 80, 81, 26],
                        fill: false,
                        borderColor: '#ef6d6d',
                    }],
                },
                options: {
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true,
                        },
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                        },
                    },
                },
            });
        },

        initialLineChartCategoryCreated() {
            const ctx = document.getElementById('lineChartCategoryCreated').getContext('2d');
            new Chartjs(ctx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Looping tension',
                        data: [65, 59, 80, 81, 26, 55, 40, 65, 59, 80, 81, 26],
                        fill: false,
                        borderColor: '#8479e1',
                    }],
                },
                options: {
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true,
                        },
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
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