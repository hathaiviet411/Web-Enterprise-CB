const User = require('../../models/user');
const {
    generateDataToken,
    verifyToken,
    generateToken,
    configJWT,
} = require('../../config/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const verifyAdmin = (user) => {
    return user.role === 'admin';
};

module.exports = {
    login: async(ctx) => {
        const user = ctx.state.user;
        const token = await generateDataToken(user._id);

        await ctx.login(user);
        return (ctx.body = {
            status: true,
            message: 'Login success',
            data: {
                access_token: token.accessToken,
                refresh_token: token.refreshToken,
                expired_time: token.expiredTime,
            },
        });
    },

    getNewAccessToken: async(ctx) => {
        const user = ctx.state.user;
        const token = await generateDataToken(user._id);

        return (ctx.body = {
            status: true,
            message: 'Get new token success',
            data: {
                access_token: token.accessToken,
                refresh_token: token.refreshToken,
                expired_time: token.expiredTime,
            },
        });
    },

    getInfo: async(ctx) => {
        const info = ctx.state.user;
        return (ctx.body = {
            status: true,
            info,
        });
    },
};
