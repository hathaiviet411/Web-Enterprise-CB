import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import app from './modules/app';
import user from './modules/user';

// Import getters
import getters from './getters';

Vue.use(Vuex);

const modules = {
    app,
    user,
};

const store = new Vuex.Store({
    modules,
    getters,
});

export default store;
