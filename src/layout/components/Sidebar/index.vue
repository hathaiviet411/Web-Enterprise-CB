<template>
	<v-navigation-drawer v-model="drawerStorage" app>
		<v-img height="200" class="pa-4" src="@/assets/images/logo.png" />
		<v-divider />
		<v-list>
			<v-list-item
				v-for="(item, index) in listRoutes"
				:key="index"
				link
				:disabled="item.disabled"
				:class="['route-item', isSelected, isDisplay]"
				@click="handleNavigation(item)"
			>
				<v-list-item-icon>
					<v-icon class="icon">{{ item.icon }}</v-icon>
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
            type: Boolean,
            default: () => {
                return true;
            },
        },
    },
    data() {
        return {
            listRoutes: [
                {
                    icon: 'fas fa-home-lg',
                    name: 'Dashboard',
                    url: '/dashboard/index',
                    disabled: false,
                },
                {
                    icon: 'fas fa-chart-bar',
                    name: 'Chart',
                    url: '/chart/index',
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
                    icon: 'fas fa-lightbulb-on',
                    name: 'Idea',
                    url: '/idea/index',
                    disabled: false,
                },
                {
                    icon: 'mdi-city',
                    name: 'Department',
                    url: '/department/index',
                    disabled: false,
                },
            ],

            drawerStorage: this.drawerStorage,
            isSelected: '',
            isDisplay: '',
        };
    },
    watch: {
        $route() {},
        drawer() {
            this.drawerStorage = !this.drawer;
        },
    },
    created() {
        this.handleSetDataWhenCreated();
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

        handleSetDataWhenCreated() {
            const CURRENT_ROUTE = this.$route.fullPath;

            for (let i = 0; i < this.listRoutes.length; i++) {
                if (this.listRoutes[i].url === CURRENT_ROUTE) {
                    this.listRoutes[i].disabled = true;
                    this.isSelected = 'v-list-item--disabled';
                } else {
                    this.listRoutes[i].disabled = false;
                    this.isSelected = '';
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.route-item {
  font-weight: bold;
}

.v-list-item--disabled {
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  color: $white !important;
  background-color: $shark;

  .icon {
    color: $dandelion;
  }
}
</style>
