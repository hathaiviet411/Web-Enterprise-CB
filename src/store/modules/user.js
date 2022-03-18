// import Cookies from 'js-cookie';

// import { getToken } from '@/utils/handleToken';
// import { getProfile } from '@/utils/handleProfile';
// import constAuth from '@/const/auth';
// import { resetRouter } from '@/router';

// const state = {
//     access_token: getToken(),
//     profile: getProfile(),
// };

// const mutations = {
//     SET_ACCESS_TOKEN: (state, access_token) => {
//         Cookies.set('token', access_token);
//         state.access_token = access_token;
//     },
//     SET_PROFILE: (state, profile) => {
//         Cookies.set('exp_token', profile.expToken);
//         Cookies.set('profile', profile);
//         state.profile = profile;
//     },
//     DO_LOGOUT: (state, profile) => {
//         state.access_token = '';
//         state.profile = profile;
//     },
//     SET_USERNAME: (state, username) => {
//         state.profile.name = username;
//     },
//     SET_USER_DEPARTMENT: (state, department_name) => {
//         state.profile.department_name = department_name;
//     },
// };

// const actions = {
//     saveLogin({ commit }, userInfo) {
//         commit('SET_PROFILE', userInfo.USER);
//         commit('SET_ACCESS_TOKEN', userInfo.TOKEN);
//     },
//     doLogout({ commit }) {
//         const PROFILE = constAuth.PROFILE;

//         commit('DO_LOGOUT', PROFILE);
//         commit('SET_ACCESS_TOKEN', '');
//         commit('SET_PROFILE', PROFILE);

//         resetRouter();
//     },
//     setUsername({ commit }, username) {
//         commit('SET_USERNAME', username);
//     },
//     setUserDepartmentName({ commit }, department_name) {
//         commit('SET_USER_DEPARTMENT', department_name);
//     },
// };

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions,
// };
