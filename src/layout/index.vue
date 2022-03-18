<template>
	<v-app id="inspire">
		<Sidebar :drawer="drawer" />
		<Topbar @drawerEvent="drawer = !drawer" />
		<v-main style="background: #f5f5f540">
			<v-container class="py-8 px-6 main" fluid>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Sidebar from './components/Sidebar/index';
import Topbar from './components/Topbar/index';
export default {
    name: 'Layout',
    components: { Topbar, Sidebar },
    data: () => ({
        cards: ['Today', 'Yesterday'],
        drawer: null,
    }),
    methods: {},
};
</script>

<style lang="scss" scoped>
	.main {
		min-width: 100% !important;
	}
</style>
