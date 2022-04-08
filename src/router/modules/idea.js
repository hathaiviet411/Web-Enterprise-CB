import Layout from "@/layout";

const idea = {
  path: "/idea",
  name: "Idea",
  meta: {
    title: "Idea Management",
    roles: ["admin, qac, qaa, staff"],
  },
  hidden: true,
  component: Layout,
  children: [
    {
      path: "index",
      name: "IdeaIndex",
      meta: {
        title: "Idea Index",
      },
      component: () =>
        import(/* webpackChunkName: "Idea" */ "@/pages/IdeaManagement/index"),
    },
  ],
};

export default idea;
