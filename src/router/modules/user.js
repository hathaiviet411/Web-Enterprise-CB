import Layout from '@/layout';

const user = {
    path: '/user',
    name: 'User',
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'UserIndex',
            meta: {
                title: 'User Index',
            },
            component: () => import(/* webpackChunkName: "User" */ '@/pages/UserManagement/index'),
        },
    ],
};

export default user;
