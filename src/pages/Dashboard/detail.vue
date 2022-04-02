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
								<span class="author-name">{{ DATA.user + ' - ' + post.user.username }}</span>
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
											<i class="fas fa-building mr-3" />Department:
										</strong>
										{{ post.department.departmentName }}
									</span>
								</v-col>

								<v-col cols="12" lg="5" class="text-center">
									<span class="text-small">
										<strong>
											<i class="fas fa-box-open mr-3" />Category:
										</strong>
										{{ post.category.categoryName }}
									</span>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-title>

				<v-card-text>
					Text
				</v-card-text>

				<v-card-actions>
					Actions
				</v-card-actions>
			</v-card>

		</b-overlay>
	</div>
</template>

<script>
import { getOneIdea } from '@/api/modules/idea';

const urlAPI = {
    apiGetListIdea: '/idea',
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
                    this.DATA = response.idea;
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
