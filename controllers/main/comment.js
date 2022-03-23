const Comment = require("../../models/comment");

const socket = io();

module.exports = {
    createComment: async (ctx) => {
        const comment = new Comment(ctx.request.body)
        const user = ctx.state.user;
        comment.user = user.user._id
        await comment.save()

        return (ctx.body = {
            status: true
        })
    },

    deleteComment: async (ctx) => {

    },

    updateComment: async (ctx) => {

    },
}