import Layout from '@/layout';

const department = {
    path: '/department',
    name: 'Department',
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
