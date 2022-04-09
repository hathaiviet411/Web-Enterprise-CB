import axios from 'axios';
// import i18n from '@/lang';
// import store from '@/store';
import router from '@/router';
// import CONST_AUTH from '@/const/auth';
import { getToken } from '@/utils/handleToken';
// import { getLanguage } from '@/lang/helper/getLang';
// import { MakeToast } from '@/utils/MakeToast';

const baseURL = process.env.VUE_APP_BASE_URL;

const service = axios.create({
    baseURL: baseURL,
    timeout: 100000,
});

service.interceptors.request.use(
    config => {
        const token = getToken();
        // config.headers['Accept-Language'] = getLanguage();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // config.header['Content-Type'] = 'multipart/form-data';
        } else {
            if (router.currentRoute.path !== '/login') {
                router.push({ path: '/login' });
            }
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        // const USER_NOT_FOUND = CONST_AUTH.USER_NOT_FOUND;

        // if (JSON.stringify(USER_NOT_FOUND) === JSON.stringify(response.data)) {
        //     store.dispatch('user/doLogout')
        //         .then(() => {
        //             router.push('/login');

        //             MakeToast({
        //                 variant: 'danger',
        //                 title: i18n.t('SESSION_TIMEOUT.TITLE'),
        //                 content: i18n.t('SESSION_TIMEOUT.MESSAGE'),
        //             });
        //         })
        //         .catch(() => {
        //             MakeToast({
        //                 variant: 'danger',
        //                 title: i18n.t('TOAST.TITLE.ERROR'),
        //                 content: i18n.t('TOAST.OTHER.ERROR'),
        //             });
        //         });
        // }

        return response.data;
    },
    error => {
        // const isCheckTitle = i18n.te(error.response.data.title);
        // const isCheckContent = i18n.te(error.response.data.message);

        // const USER_NOT_FOUND = CONST_AUTH.USER_NOT_FOUND;

        // if (JSON.stringify(USER_NOT_FOUND) === JSON.stringify(error.response.data)) {
        //     store.dispatch('user/doLogout')
        //         .then(() => {
        //             router.push('/login');

        //             MakeToast({
        //                 variant: 'danger',
        //                 title: i18n.t('SESSION_TIMEOUT.TITLE'),
        //                 content: i18n.t('SESSION_TIMEOUT.MESSAGE'),
        //             });
        //         })
        //         .catch(() => {
        //             MakeToast({
        //                 variant: 'danger',
        //                 title: i18n.t('TOAST.TITLE.ERROR'),
        //                 content: i18n.t('TOAST.OTHER.ERROR'),
        //             });
        //         });
        // } else {
        //     if (isCheckTitle && isCheckContent) {
        //         MakeToast({
        //             variant: 'warning',
        //             title: i18n.t(error.response.data.title),
        //             content: i18n.t(error.response.data.message),
        //         });
        //     }
        // }

        return Promise.reject(error);
    }
);

export { service };
