const Comment = require("../../models/comment");
const Idea = require("../../models/idea")
const sendEmail = require("../../middleware/nodemailer");
const userRole = require("../../models/userRole");

module.exports = (io, socket) => {
    userReadIdea = async (payload) => {
        const { ideaId } = payload;

        await Idea.findByIdAndUpdate(ideaId, { $inc: { viewCount: 1 } });

        socket.join("idea:" + ideaId);
    }

    createComment = async (payload) => {
        const { commentContent, ideaId, isAnonymous } = payload;
        const userId = socket.decoded.payload;
        const idea = await Idea.findOne({ _id: ideaId }).populate("user", "-password").lean();
        if (idea.isDisabled === true) {
            socket.to("idea:" + ideaId).emit("comment:create", "this idea is closed");
        }
        if (idea) {
            const thisComment = new Comment({
                commentContent: commentContent,
                idea: ideaId,
                user: userId,
                isAnonymous: isAnonymous,
            });
            await thisComment.save();
            // const comment = await Comment.findOne({ _id: thisComment._id }).populate('user', '-password').lean()
            const comment = await Comment.find({ idea: ideaId }).populate('user', '-password').sort({ createdAt: 'DESC' }).lean()
            const payload = {
                comment
            }
            // socket.broadcast.to(ideaId).emit("renderComment", payload)
            socket.emit("renderComment", payload);
            socket.broadcast.emit("renderBroadcastComment", payload);
            // socket.to("idea:" + ideaId).emit("renderComment", payload);
        }

        else {
            throw new Error('idea not found');
        }

        sendEmail({
            to: idea.user.email,
            subject: "New Comment",
            html: '<p>A person just commented on your idea</p>'
        })
    }

    deleteComment = async (payload) => {
        const { commentId, ideaId } = payload;
        if (!commentId) {
            throw new Error('comment not found');
        }

        await Comment.deleteOne({ _id: commentId });

    }

    updateComment = async (ctx) => {
        const { commentContent, commentId, ideaId } = payload;

        if (!commentId || commentContent) {
            throw new Error('comment not found');
        }

        const comment = await Comment.findByIdAndUpdate({ _id: commentId }, { commentContent: commentContent });

        socket.to("idea:" + ideaId).emit("comment:update", comment);
    }


    socket.on("comment:create", createComment);
    socket.on("comment:delete", deleteComment);
    socket.on("comment:update", updateComment);
    socket.on("idea", userReadIdea)
}