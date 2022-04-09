import Layout from '@/layout';

const role = {
    path: '/role',
    name: 'Role',
    meta: {
        title: 'Role Management',
        roles: ['admin, qac, qaa, staff'],
    },
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'RoleIndex',
            meta: {
                title: 'Role Index',
            },
            component: () => import(/* webpackChunkName: "Role" */ '@/pages/RoleManagement/index'),
        },
    ],
};

export default role;
