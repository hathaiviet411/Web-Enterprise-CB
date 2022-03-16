import Vue from 'vue';
import App from '@/pages/App';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/font-awesome/css/all.min.css';
import '@/scss/index.scss';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    vuetify,
    router,
    render: h => h(App),
}).$mount('#app');
