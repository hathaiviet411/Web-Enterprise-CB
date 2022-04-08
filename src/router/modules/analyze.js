import Layout from "@/layout";

const analyze = {
  path: "/analyze",
  name: "Analyze",
  meta: {
    title: "Analyze Management",
    roles: ["Admin, qac, qaa, staff"],
  },
  hidden: true,
  component: Layout,
  children: [
    {
      path: "index",
      name: "AnalyzeIndex",
      meta: {
        title: "Analyze Index",
      },
      component: () =>
        import(
          /* webpackChunkName: "Analyze" */ "@/pages/AnalyzeManagement/index"
        ),
    },
  ],
};

export default analyze;
