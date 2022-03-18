import Layout from '@/layout';

const department = {
    path: '/department',
    name: 'Department',
    meta: {
        title: 'Department Management',
        roles: ['admin, qac, qaa, staff'],
    },
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'DepartmentIndex',
            meta: {
                title: 'Department Index',
            },
            component: () => import(/* webpackChunkName: "Department" */ '@/pages/DepartmentManagement/index'),
        },
    ],
};

export default department;
