const Comment = require("../../models/comment");
const Idea = require("../../models/idea")
const sendEmail = require("../../middleware/nodemailer")

module.exports = (io, socket) => {
    userReadIdea = async (payload) => {
        const { ideaId } = payload;

        console.log(payload);

        await Idea.findByIdAndUpdate(ideaId, { $inc: { viewCount: 1 } });

        socket.join(ideaId);
    }

    createComment = async (payload) => {
        const { commentContent, ideaId, isAnonymous } = payload;
        const user = socket.decoded.payload;
        const idea = await Idea.findOne({ _id: ideaId }).populate('user').lean();
        if (idea) {
            const comment = new Comment({
                commentContent: commentContent,
                idea: ideaId,
                user: user,
                isAnonymous: isAnonymous,
            });

            console.log(comment)

            // await comment.save()

            socket.broadcast.to(ideaId).emit("renderComment", comment)
            socket.emit("renderComment", comment)

            io.to(ideaId).emit("renderComment", comment)
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

        await Comment.deleteOne({ _id: commentId })

        socket.broadcast.to(ideaId).emit("renderComment", commentId)
    }

    updateComment = async (ctx) => {
        const { commentContent, commentId } = payload;

        if(!commentId || commentContent) {
            throw new Error('comment not found');
        }

        const comment = await Comment.findByIdAndUpdate({ _id: commentId }, { commentContent: commentContent });

        socket.broadcast.to(ideaId).emit("renderComment", comment)
    }


    socket.on("comment:create", createComment);
    socket.on("comment:delete", deleteComment);
    socket.on("comment:update", updateComment);
    socket.on("idea", userReadIdea)
}