const Like = require("../../models/like");
const Idea = require("../../models/idea");
const Dislike = require("../../models/dislike");

module.exports = {
  like: async (ctx) => {
    const { ideaId } = ctx.request.body;
    const userId = ctx.state.user.user._id;
    const like = new Like({
      user: userId,
      idea: ideaId,
    });

    await like.save();
    await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: 1 } });
    const count = await Like.find({ idea: ideaId }).count();
    return (ctx.body = {
      status: true,
      like: count,
      message: "like success",
    });
  },

  unlike: async (ctx) => {
    const ideaId = ctx.params.id;
    const userId = ctx.state.user.user._id;
    const deleteAction = await Like.deleteOne({ idea: ideaId, user: userId });
    if (deleteAction.deletedCount === 1) {
      await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: -1 } });
    }
    const count = await Like.find({ idea: ideaId }).count();
    return (ctx.body = {
      status: true,
      like: count,
      message: "unlike success",
    });
  },

  dislike: async (ctx) => {
    const { ideaId } = ctx.request.body;
    const userId = ctx.state.user.user._id;
    const dislike = new Dislike({
      user: userId,
      idea: ideaId,
    });

    await dislike.save();
    await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: -1 } });
    const count = await Dislike.find({ idea: ideaId }).count();
    return (ctx.body = {
      status: true,
      dislike: count,
      message: "dislike success",
    });
  },

  undislike: async (ctx) => {
    const ideaId = ctx.params.id;
    const userId = ctx.state.user.user._id;
    const deleteAction = await Dislike.deleteOne({
      idea: ideaId,
      user: userId,
    });
    if (deleteAction.deletedCount === 1) {
      await Idea.findByIdAndUpdate(ideaId, { $inc: { pointCount: 1 } });
    }
    const count = await Dislike.find({ idea: ideaId }).count();
    return (ctx.body = {
      status: true,
      dislike: count,
      message: "undislike success",
    });
  },
};
