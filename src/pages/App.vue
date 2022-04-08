<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(
      "%cCollect Idea System",
      "font-size: 20px; padding: 5px 10px 5px 10px; border-radius: .25rem; color: #55AEEE; background-color: #0F0049; text-align: center;"
    );
  },
  mounted() {
    const ROLE = this.$store.getters.role;

    this.$store.dispatch("role/generateRoutes", ROLE).then((routes) => {
      for (let route = 0; route < routes.length; route++) {
        this.$router.addRoute(routes[route]);
      }
    });
  },
};
</script>
