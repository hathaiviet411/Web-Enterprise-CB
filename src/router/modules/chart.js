import Layout from '@/layout';

const chart = {
    path: '/chart',
    name: 'Chart',
    meta: {
        title: 'Chart Management',
        roles: ['Admin, qac, qaa, staff'],
    },
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'ChartIndex',
            meta: {
                title: 'Chart Index',
            },
            component: () => import(/* webpackChunkName: "Chart" */ '@/pages/ChartManagement/index'),
        },
    ],
};

export default chart;
