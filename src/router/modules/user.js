import Layout from "@/layout";

const user = {
  path: "/user",
  name: "User",
  meta: {
    title: "User Management",
    roles: ["admin, qac, qaa, staff"],
  },
  hidden: true,
  component: Layout,
  children: [
    {
      path: "index",
      name: "UserIndex",
      meta: {
        title: "User Index",
      },
      component: () =>
        import(/* webpackChunkName: "User" */ "@/pages/UserManagement/index"),
    },
  ],
};

export default user;
