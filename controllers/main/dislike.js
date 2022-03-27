const Dislike = require("../../models/dislike");

module.exports = (io, socket) => { 
    dislike = async(payload) => {
        const { ideaId } = payload;
        const userId = socket.decoded.payload;
        const dislike = new Dislike({
            user: userId,
            idea: ideaId
        })

        await dislike.save();
        await Dislike.findByIdAndUpdate(ideaId, { $inc: { pointCount: -1 } });
        let dislikes = await Dislike.find({ idea: ideaId }).count();
        dislikes = {
            ...dislikes,
            ideaId
        }
        socket.emit("dislike", dislikes)
    }

    undislike = async(payload) => {
        const { ideaId } = payload;
        const userId = socket.decoded.payload;
        await Dislike.deleteOne({ idea: ideaId, user: userId });
        await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: 1 } });
        let dislikes = await Dislike.find({ idea: ideaId }).count();
        dislikes = {
            ...dislikes,
            ideaId
        }
        socket.emit("dislike", dislikes)
    }

    socket.on("dislike:create", dislike);
    socket.on("dislike:delete", undislike);
}