import Vue from 'vue';
import App from '@/pages/App';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import i18n from '@/lang';
import store from '@/store';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/font-awesome/css/all.min.css';
import '@/scss/index.scss';
import '@/assets/font-awesome/css/all.min.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CKEditor);

new Vue({
    vuetify,
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
