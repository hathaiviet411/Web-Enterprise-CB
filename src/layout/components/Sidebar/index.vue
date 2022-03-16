<template>
	<v-navigation-drawer v-model="drawerStorage" app>
		<v-img height="140" class="pa-4" src="@/assets/images/logo.png" />
		<v-divider />
		<v-list>
			<v-list-item
				v-for="(item, index) in listRoutes"
				:key="index"
				link
				:disabled="item.disabled"
				class="route-item"
				@click="handleNavigation(item)"
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        drawer: {
            type: [Array, String, Object],
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            listRoutes: [
                {
                    icon: 'mdi-microsoft-windows',
                    name: 'Dashboard',
                    url: '/dashboard/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-account',
                    name: 'User',
                    url: '/user/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-clipboard-list-outline',
                    name: 'Category',
                    url: '/category/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-card-account-details-outline',
                    name: 'Ideal',
                    url: '/ideal/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-city',
                    name: 'Department',
                    url: '/department/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-cog',
                    name: 'System Setting',
                    url: '/system-setting/index',
                    disabled: false,
                },
            ],
            drawerStorage: this.drawer,
        };
    },
    watch: {
        $route() {},
    },
    methods: {
        async handleNavigation(item) {
            for (let i = 0; i < this.listRoutes.length; i++) {
                if (this.listRoutes[i].name === item.name) {
                    this.listRoutes[i].disabled = true;
                } else {
                    this.listRoutes[i].disabled = false;
                }
            }
            this.$router.push({ path: `${item.url}` });
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '@/scss/variables.scss';

    .v-list-item--disabled {
        background-color: $west-side;
    }
</style>
