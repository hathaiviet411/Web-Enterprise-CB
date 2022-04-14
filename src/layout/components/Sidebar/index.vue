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
				:class="['route-item,', isSelected, item.isHidden]"
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
            listRoutes: [],

            drawerStorage: this.drawerStorage,
            isSelected: '',
            isDisplay: '',
        };
    },
    computed: {
        role() {
            return this.$store.getters.role;
        },
    },
    watch: {
        drawer() {
            this.drawerStorage = !this.drawer;
        },
    },
    created() {
        this.initialListRoutes();
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

        initialListRoutes() {
            console.log(this.role);
            this.listRoutes = [
                {
                    icon: 'fas fa-home-lg',
                    name: this.$t('ROUTER.DASHBOARD'),
                    url: '/dashboard/index',
                    disabled: false,
                    isHidden: '',
                },
                {
                    icon: 'fas fa-chart-bar',
                    name: this.$t('ROUTER.CHART'),
                    url: '/chart/index',
                    disabled: false,
                    isHidden: (this.role === 'Quality Assurance Manager' || this.role === 'Admin') ? '' : 'd-none',
                },
                {
                    icon: 'mdi-account',
                    name: this.$t('ROUTER.USER'),
                    url: '/user/index',
                    disabled: false,
                    isHidden: '',
                },
                {
                    icon: 'mdi-clipboard-list-outline',
                    name: this.$t('ROUTER.CATEGORY'),
                    url: '/category/index',
                    disabled: false,
                    isHidden: '',
                },
                {
                    icon: 'fas fa-lightbulb-on',
                    name: this.$t('ROUTER.IDEA'),
                    url: '/idea/index',
                    disabled: false,
                    isHidden: '',
                },
                {
                    icon: 'mdi-city',
                    name: this.$t('ROUTER.DEPARTMENT'),
                    url: '/department/index',
                    disabled: false,
                    isHidden: '',
                },
            ];
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
