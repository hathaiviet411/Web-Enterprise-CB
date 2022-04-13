<template>
	<v-app-bar app elevation="6" color="white">
		<v-app-bar-nav-icon @click="$emit('drawerEvent')" />

		<v-spacer />

		<v-spacer />

		<v-menu offset-y rounded="xl">
			<template v-slot:activator="{ attrs, on }">
				<v-btn
					class="rounded-xl text-white mr-4"
					color="#7366FF"
					v-bind="attrs"
					v-on="on"
				>
					<span>{{ language === 'vn' ? 'Tiếng Việt' : 'English' }}</span>
				</v-btn>
			</template>

			<v-list three-line max-width="210">
				<template>
					<v-list-item>
						<v-list-item-content>
							<v-row>
								<v-col cols="12">
									<v-btn block :class="['rounded-xl', language === 'en' ? 'active-btn' : '']" @click="setLanguage('en')">
										<v-img class="flag-icon mr-10" :src="require('@/assets/images/united-kingdom.png')" />
										<span>{{ $t('NAVBAR.ENGLISH') }}</span>
									</v-btn>
								</v-col>

								<v-col cols="12">
									<v-btn block :class="['rounded-xl', language === 'vn' ? 'active-btn' : '']" @click="setLanguage('vn')">
										<v-img class="flag-icon mr-3" :src="require('@/assets/images/vietnam.png')" />
										<span>{{ $t('NAVBAR.VIETNAMESE') }}</span>
									</v-btn>
								</v-col>
							</v-row>
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
								<v-img src="@/assets/images/avatar.png" />
							</v-avatar>
						</v-badge>
						<span class="ml-1">{{ user.name }}</span>
					</v-chip>
				</span>
			</template>
			<v-list width="250" class="py-0">
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="@/assets/images/avatar.png">
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ user.name }}</v-list-item-title>
						<v-list-item-subtitle>
							<v-chip class="ma-2" color="success">
								<v-icon left x-small>mdi-check</v-icon>
								Logged in
							</v-chip>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item
					v-for="(menu, index) in menus"
					:key="index"
					link
					@click="handleProfileAction(menu)"
				>
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
import { MakeToast } from '@/toast/toastMessage';

export default {
    name: 'Topbar',
    data() {
        return {
            menus: [
                { title: 'Profile', icon: 'mdi-account' },
                { title: 'Change Password', icon: 'mdi-key' },
                { title: 'Logout', icon: 'mdi-logout' },
            ],
            items: [
                { divider: true, inset: true },
            ],
            user: {
                name: this.$store.getters.profile.name,
            },
        };
    },
    computed: {
        language() {
            return this.$store.getters.language;
        },
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
                    this.doLogout();
                    break;
                default:
                    break;
            }
        },

        async doLogout() {
            try {
                await this.$store.dispatch('user/doLogout');

                MakeToast({
                    variant: 'success',
                    title: 'Success',
                    content: 'Logout Successful',
                });

                this.$router.push('/login');
            } catch (error) {
                console.log(error.message);
            }

            await this.$store.dispatch('role/clearData');
        },

        setLanguage(lang) {
            this.$store.dispatch('app/setLanguage', lang)
                .then(() => {
                    this.$i18n.locale = lang;

                    MakeToast({
                        variant: 'success',
                        title: this.$t('TOAST.TITLE.SUCCESS'),
                        content: this.$t('TOAST.I18N.CHANGE_LANGUAGE.SUCCESS'),
                    });
                })
                .catch((error) => {
                    console.log(error);
                    MakeToast({
                        variant: 'success',
                        title: this.$t('TOAST.TITLE.SUCCESS'),
                        content: this.$t('TOAST.I18N.CHANGE_LANGUAGE.FAILED'),
                    });
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.flag-icon {
  max-width: 25px;
  max-height: 25px;
  vertical-align: middle;
}

.active-btn {
  font-weight: bold;
  background-color: #4CAF50 !important;
  color: #FFFFFF !important;
}
</style>
