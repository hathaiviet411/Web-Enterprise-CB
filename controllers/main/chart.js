//getListIdeasHaveMostView

const Idea = require("../../models/idea");
const User = require("../../models/user");
const Like = require("../../models/like");
const Dislike = require("../../models/dislike");
require("dotenv").config();


// /api/chart/list-ideas-have-most-view

module.exports = {
    getDashboardLikes: async (ctx) => {

        let response = []
        const user = ctx.state.user.user._id.toString()

        const ideas = await Idea.find({ user }).lean()

        for (let idea of ideas) {
            const like = await Like.find({ idea: idea._id.toString() }).count()
            const item = {
                ideaTitle: idea.ideaTitle,
                likes: like
            };
            response.push(item)
        }
        return (ctx.body = {
            status: true,
            message: "get dashboard success",
            data: response.sort(function (a, b) {
                if (a.likes < b.likes) {
                    return 1;
                }
                if (a.likes > b.likes) {
                    return -1;
                }
                return 0;
            }).slice(0, 5),
        })
    },

    getListIdeasHaveMostView: async (ctx) => {
        const pageSize = 5
        const idea = await Idea.find({}).sort({ viewCount: 'DESC' }).limit(pageSize).lean();

        const response = idea.map((idea) => {
            return {
                id: idea._id.toString(),
                label: idea.ideaTitle,
                views: idea.viewCount
            }
        })
        return (ctx.body = {
            status: true,
            message: "get idea success",
            data: {
                idea: response
            }
        })
    }

};