<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
    name: 'App',
    created() {
        console.log(
            '%cCollect Ideal System',
            'font-size: 20px; padding: 5px 10px 5px 10px; border-radius: .25rem; color: #55AEEE; background-color: #0F0049; text-align: center;'
        );
    },
    mounted() {
    //     const ROLES = this.$store.getters.roles;
    //     const PERMISSIONS = this.$store.getters.permissions;

    //     this.$store.dispatch('permissions/generateRoutes', { roles: ROLES, permissions: PERMISSIONS })
    //         .then((routes) => {
    //             for (let route = 0; route < routes.length; route++) {
    //                 this.$router.addRoute(routes[route]);
    //             }
    //         });
    },
};
</script>
