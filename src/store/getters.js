const getters = {
    isRememberMe: (state) => state.app.isRememberMe,
    token: (state) => state.user.access_token,
    profile: (state) => state.user.profile,
    role: (state) => state.user.profile.role,
    language: (state) => state.app.language,
};

export default getters;
