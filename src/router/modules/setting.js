import Layout from '@/layout';

const setting = {
    path: '/setting',
    name: 'Setting',
    meta: {
        title: 'Setting Management',
        roles: ['admin, qac, qaa, staff'],
    },
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'SettingIndex',
            meta: {
                title: 'Setting Index',
            },
            component: () =>
                import(/* webpackChunkName: "Setting" */ '@/pages/Setting/index'),
        },
    ],
};

export default setting;
