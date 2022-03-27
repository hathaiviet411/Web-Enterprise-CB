const Like = require("../../models/like");
const Idea = require("../../models/idea");

module.exports = (io, socket) => {
    like = async (payload) => {
        const { ideaId } = payload;
        const userId = socket.decoded.payload;
        const like = new Like({
            user: userId,
            idea: ideaId
        })

        await like.save();
        await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: 1 } });
        let likes = await Like.find({ idea: ideaId }).count();
        likes = {
            ...likes,
            ideaId
        }
        socket.emit("like", likes)
    }

    unlike = async (payload) => {
        const { ideaId } = payload;
        const userId = socket.decoded.payload;
        await Like.deleteOne({ idea: ideaId, user: userId });
        await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: -1 } });
        let likes = await Like.find({ idea: ideaId }).count();
        likes = {
            ...likes,
            ideaId
        }
        socket.emit("like", likes)
    }

    socket.on("like:create", like);
    socket.on("like:delete", unlike);
}