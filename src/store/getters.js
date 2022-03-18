const getters = {
    isRememberMe: state => state.app.isRememberMe,
    token: state => state.user.access_token,
    profile: state => state.user.profile,
    role: state => state.user.profile.role,
};

export default getters;
