import Layout from '@/layout';

const ideal = {
    path: '/ideal',
    name: 'Ideal',
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'IdealIndex',
            meta: {
                title: 'Ideal Index',
            },
            component: () => import(/* webpackChunkName: "Ideal" */ '@/pages/IdealManagement/index'),
        },
    ],
};

export default ideal;
