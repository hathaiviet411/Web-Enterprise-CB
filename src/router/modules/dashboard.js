import Layout from "@/layout";

const dashboard = {
  path: "/dashboard",
  name: "Dashboard",
  meta: {
    title: "Dashboard",
    roles: ["admin, qac, qaa, staff"],
  },
  hidden: true,
  component: Layout,
  children: [
    {
      path: "index",
      name: "DashboardIndex",
      meta: {
        title: "Dashboard Index",
      },
      component: () =>
        import(/* webpackChunkName: "Dashboard" */ "@/pages/Dashboard/index"),
    },
    {
      path: "detail/:id",
      name: "DashboardDetail",
      meta: {
        title: "Dashboard Detail",
      },
      component: () =>
        import(
          /* webpackChunkName: "DashboardDetail" */ "@/pages/Dashboard/detail"
        ),
    },
  ],
};

export default dashboard;
