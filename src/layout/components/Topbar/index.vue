<template>
	<v-app-bar app elevate-on-scroll elevation="3" color="white">
		<v-app-bar-nav-icon @click="$emit('drawerEvent')" />
		<v-spacer />
		<v-col lg="6" cols="12">
			<v-form>
				<v-text-field
					class="p-0 m-0 mt-6"
					full-width
					dense
					append-icon="mdi-magnify"
					outlined
					rounded
					placeholder="Search"
				/>
			</v-form>
		</v-col>
		<v-spacer />
		<v-menu offset-y>
			<template v-slot:activator="{ attrs, on }">
				<span
					class="mx-5 mr-10"
					style="cursor: pointer"
					v-bind="attrs"
					v-on="on"
				>
					<v-badge content="3" color="red" offset-y="10" offset-x="10">
						<v-icon>mdi-bell</v-icon>
					</v-badge>
				</span>
			</template>
			<v-list three-line width="250">
				<template v-for="(item, index) in items">
					<v-subheader
						v-if="item.header"
						:key="item.header"
						v-text="item.header"
					/>

					<v-divider
						v-else-if="item.divider"
						:key="index"
						:inset="item.inset"
					/>

					<v-list-item v-else :key="item.title">
						<v-list-item-avatar>
							<v-img :src="item.avatar" />
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title v-html="item.title" />
							<v-list-item-subtitle
								v-html="item.subtitle"
							/>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-menu>
		<v-menu offset-y>
			<template v-slot:activator="{ attrs, on }">
				<span style="cursor: pointer" v-bind="attrs" v-on="on">
					<v-chip link>
						<v-badge dot bottom color="green" offset-y="10" offset-x="10">
							<v-avatar size="40">
								<v-img src="https://randomuser.me/api/portraits/women/81.jpg" />
							</v-avatar>
						</v-badge>
						<span class="ml-3">Jane Smith</span>
					</v-chip>
				</span>
			</template>
			<v-list width="250" class="py-0">
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="https://randomuser.me/api/portraits/women/81.jpg">
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Jane Smith</v-list-item-title>
						<v-list-item-subtitle>Logged In</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item v-for="(menu, index) in menus" :key="index" link @click="handleProfileAction(menu)">
					<v-list-item-icon>
						<v-icon>{{ menu.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-title>
						{{ menu.title }}
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
export default {
    name: 'Topbar',
    data() {
        return {
            menus: [
                { title: 'Profile', icon: 'mdi-account' },
                { title: 'Change Password', icon: 'mdi-key' },
                { title: 'Setting', icon: 'mdi-cog' },
                { title: 'Logout', icon: 'mdi-logout' },
            ],
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Trăng Trong Nước',
                    subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                { divider: true, inset: true },
            ],
        };
    },
    methods: {
        handleProfileAction(action) {
            const ACTION = action.title;
            const PROFILE = 'Profile';
            const CHANGE_PASSWORD = 'Change Password';
            const SETTING = 'Setting';
            const LOGOUT = 'Logout';

            switch (ACTION) {
                case PROFILE:
                    this.$router.push('/profile');
                    break;
                case CHANGE_PASSWORD:
                    this.$router.push('/change-password');
                    break;
                case SETTING:
                    this.$router.push('/setting');
                    break;
                case LOGOUT:
                    this.$router.push('/login');
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style scoped></style>
