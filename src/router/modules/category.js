import Layout from '@/layout';

const category = {
    path: '/category',
    name: 'Category',
    hidden: true,
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'CategoryIndex',
            meta: {
                title: 'Category Index',
            },
            component: () => import(/* webpackChunkName: "Category" */ '@/pages/CategoryManagement/index'),
        },
    ],
};

export default category;
