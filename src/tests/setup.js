import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import Vuetify from 'vuetify';
Vue.use(Vuetify);

import { config } from '@vue/test-utils';
config.mocks.$t = (key) => key;

Vue.config.productionTip = false;
config.showDeprecationWarnings = false;

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
