import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Import modules router
import login from './modules/login';
import dashboard from './modules/dashboard';
import user from './modules/user';
import category from './modules/category';
import ideal from './modules/ideal';
import department from './modules/department';
import setting from './modules/setting';

export const constantRoutes = [
    {
        path: '/',
        redirect: { name: 'DashboardIndex' },
        hidden: true,
    },
    login,
    dashboard,
    user,
    category,
    ideal,
    department,
    setting,
];

export const asyncRoutes = [
    dashboard,
    user,
    category,
    ideal,
    department,
    setting,
];

const createRouter = () => new VueRouter({
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

