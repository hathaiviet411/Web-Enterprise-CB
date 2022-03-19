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
					Login Successfully! Welcome to <strong>Collect Ideal System</strong>
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
									A new ideal has been added to Sport category!
								</div>
							</v-timeline-item>

							<v-timeline-item color="red" small>
								<strong>1,5 hours ago</strong>
								<div class="text-caption">
									An ideal has been removed from Food category!
								</div>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card>
					<v-data-table
						:headers="headers"
						:items="desserts"
						:items-per-page="5"
						class="elevation-1"
					>
						<template v-slot:[`item.actions`]>
							<v-icon normal style="color: #051367;">mdi-eye</v-icon>
							<!-- <v-icon normal class="mr-2" style="color: #051367;">mdi-pencil</v-icon> -->
							<!-- <v-icon normal style="color: #E84545;">mdi-delete</v-icon> -->
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
    ideal_name: 'Dashboard',
    data() {
        return {
            activityLog: [
                { title: 'Total User', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3' },
                { title: 'Total Ideal', amount: '245.7k', icon: 'mdi-account-group-outline', color: 'green darken-2' },
                { title: 'Total Category', amount: 237, icon: 'mdi-account-group-outline', color: 'blue-grey darken-1' },
                { title: 'Staffs', amount: 3433, icon: 'mdi-account-group-outline', color: 'deep-orange darken-1' },
            ],
            headers: [
                { text: 'Ideal', align: 'start', sortable: false, value: 'ideal_name' },
                { text: 'Category', value: 'category' },
                { text: 'Views (k)', value: 'view' },
                { text: 'Comments (k)', value: 'comment' },
                { text: 'Likes (k)', value: 'like' },
                { text: 'Dislikes (k)', value: 'dislike' },
                { text: 'Actions', value: 'actions' },
            ],
            desserts: [
                {
                    ideal_name: 'Frozen Yogurt',
                    category: 159,
                    view: 6,
                    comment: 24,
                    like: 4,
                    dislike: 2,
                },
                {
                    ideal_name: 'Ice cream sandwich',
                    category: 237,
                    view: 9,
                    comment: 37,
                    like: 4.3,
                    dislike: 9,
                },
                {
                    ideal_name: 'Eclair',
                    category: 262,
                    view: 16,
                    comment: 23,
                    like: 6,
                    dislike: 2,
                },
                {
                    ideal_name: 'Cupcake',
                    category: 305,
                    view: 3.7,
                    comment: 67,
                    like: 4.3,
                    dislike: 8,
                },
                {
                    ideal_name: 'Gingerbread',
                    category: 356,
                    view: 16,
                    comment: 49,
                    like: 3.9,
                    dislike: 16,
                },
                {
                    ideal_name: 'Jelly bean',
                    category: 375,
                    view: 2,
                    comment: 94,
                    like: 9,
                    dislike: 1,
                },
                {
                    ideal_name: 'Lollipop',
                    category: 392,
                    view: 0.2,
                    comment: 98,
                    like: 2,
                    dislike: 2,
                },
                {
                    ideal_name: 'Honeycomb',
                    category: 408,
                    view: 3.2,
                    comment: 87,
                    like: 6.5,
                    dislike: 21,
                },
                {
                    ideal_name: 'Donut',
                    category: 452,
                    view: 25,
                    comment: 51,
                    like: 4.9,
                    dislike: 22,
                },
                {
                    ideal_name: 'KitKat',
                    category: 518,
                    view: 26,
                    comment: 65,
                    like: 7,
                    dislike: 6,
                },
            ],
        };
    },
    methods: {
        onButtonClick(item) {
            console.log('click on ' + item.no);
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
