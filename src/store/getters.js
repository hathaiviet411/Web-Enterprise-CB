const getters = {
    isRememberMe: (state) => state.app.isRememberMe,
    token: (state) => state.user.access_token,
    profile: (state) => state.user.profile,
    role: (state) => state.user.profile.role,
    language: (state) => state.app.language,
    totalIdea: (state) => state.chart.totalIdea,
    totalDepartment: (state) => state.chart.totalDepartment,
    totalCategory: (state) => state.chart.totalCategory,
    totalUser: (state) => state.chart.totalUser,
};

export default getters;
