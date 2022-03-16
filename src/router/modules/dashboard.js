import Layout from '@/layout';

const dashboard = {
    path: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'DashboardIndex',
            meta: {
                title: 'Dashboard Index',
            },
            component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard/index'),
        },
    ],
};

export default dashboard;
