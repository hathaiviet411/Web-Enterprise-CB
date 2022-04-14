import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Import modules router
import login from './modules/login';
import dashboard from './modules/dashboard';
import chartManagement from './modules/chart';
import user from './modules/user';
import category from './modules/category';
import idea from './modules/idea';
import department from './modules/department';
import ErrorPage from './modules/page404';
import role from './modules/role';

export const constantRoutes = [
    {
        path: '/',
        redirect: { name: 'Login' },
        hidden: true,
    },
    login,
];

export const asyncRoutes = [
    dashboard,
    chartManagement,
    user,
    category,
    idea,
    department,
    ErrorPage,
    {
        path: '*',
        redirect: { name: 'ErrorPage' },
        hidden: true,
    },
    role,
];

const createRouter = () =>
    new VueRouter({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
