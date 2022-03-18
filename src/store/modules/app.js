import Cookies from 'js-cookie';
import { getLanguage } from '@/lang/helper/getLang';

function getStateRememberUser() {
    const isRememberMe = Cookies.get('isRememberMe');

    if (isRememberMe) {
        return 'checked';
    }

    return 'not_checked';
}

const state = {
    language: getLanguage(),
    isRememberMe: getStateRememberUser(),
};

const mutations = {
    SET_LANGUAGE: (state, language) => {
        state.language = language;
        Cookies.set('language', language);
    },
    SET_REMEMBER_ME: (state, isRememberMe) => {
        state.isRememberMe = isRememberMe;
        Cookies.set('isRememberMe', isRememberMe);
    },
};

const actions = {
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language);
    },
    setRememberMe({ commit }, isRememberMe) {
        commit('SET_REMEMBER_ME', isRememberMe);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
