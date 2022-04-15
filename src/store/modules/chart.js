import Cookies from 'js-cookie';

function getChartTotalIdea() {
    const totalIdea = Cookies.get('totalIdea');

    if (totalIdea) {
        return parseInt(totalIdea);
    }

    return 0;
}

function getChartTotalDepartment() {
    const totalDepartment = Cookies.get('totalDepartment');

    if (totalDepartment) {
        return parseInt(totalDepartment);
    }

    return 0;
}

function getChartTotalCategory() {
    const totalCategory = Cookies.get('totalCategory');

    if (totalCategory) {
        return parseInt(totalCategory);
    }

    return 0;
}

function getChartTotalUser() {
    const totalUser = Cookies.get('totalUser');

    if (totalUser) {
        return parseInt(totalUser);
    }

    return 0;
}

const state = {
    totalIdea: getChartTotalIdea(),
    totalDepartment: getChartTotalDepartment(),
    totalCategory: getChartTotalCategory(),
    totalUser: getChartTotalUser(),
};

const mutations = {
    SET_TOTAL_IDEA: (state, totalIdea) => {
        state.totalIdea = totalIdea;
        Cookies.set('totalIdea', totalIdea);
    },
    SET_TOTAL_DEPARTMENT: (state, totalDepartment) => {
        state.totalDepartment = totalDepartment;
        Cookies.set('totalDepartment', totalDepartment);
    },
    SET_TOTAL_CATEGORY: (state, totalCategory) => {
        state.totalCategory = totalCategory;
        Cookies.set('totalCategory', totalCategory);
    },
    SET_TOTAL_USER: (state, totalUser) => {
        state.totalUser = totalUser;
        Cookies.set('totalUser', totalUser);
    },
};

const actions = {
    setTotalIdea({ commit }, totalIdea) {
        commit('SET_TOTAL_IDEA', totalIdea);
    },
    setTotalDepartment({ commit }, totalDepartment) {
        commit('SET_TOTAL_DEPARTMENT', totalDepartment);
    },
    setTotalCategory({ commit }, totalCategory) {
        commit('SET_TOTAL_CATEGORY', totalCategory);
    },
    setTotalUser({ commit }, totalUser) {
        commit('SET_TOTAL_USER', totalUser);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
