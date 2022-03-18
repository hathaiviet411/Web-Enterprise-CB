import Cookies from 'js-cookie';

import { getToken } from '@/utils/handleToken';
import { getProfile } from '@/utils/handleProfile';
import constAuth from '@/const/auth';
import { resetRouter } from '@/router';

const state = {
    access_token: getToken(),
    profile: getProfile(),
};

const mutations = {
    SET_ACCESS_TOKEN: (state, access_token) => {
        Cookies.set('token', access_token);
        state.access_token = access_token;
    },
    SET_PROFILE: (state, profile) => {
        Cookies.set('expired_token', profile.expired_token);
        Cookies.set('refresh_token', profile.refresh_token);
        Cookies.set('profile', profile);
        state.profile = profile;
    },
    // SET_USER_DEPARTMENT: (state, department_name) => {
    //     state.profile.department_name = department_name;
    // },
    DO_LOGOUT: (state, profile) => {
        state.access_token = '';
        state.profile = profile;
    },
};

const actions = {
    saveLogin({ commit }, token) {
        commit('SET_ACCESS_TOKEN', token);
    },
    saveProfile({ commit }, profile) {
        commit('SET_PROFILE', profile);
    },
    // setUserDepartmentName({ commit }, department_name) {
    //     commit('SET_USER_DEPARTMENT', department_name);
    // },
    doLogout({ commit }) {
        const PROFILE = constAuth.PROFILE;

        commit('DO_LOGOUT', PROFILE);
        commit('SET_ACCESS_TOKEN', '');
        commit('SET_PROFILE', PROFILE);

        resetRouter();
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
