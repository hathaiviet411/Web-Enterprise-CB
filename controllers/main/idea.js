const Idea = require("../../models/idea");
const User = require("../../models/user");
const UserRole = require("../../models/userRole");
const Role = require("../../models/role");
const Category = require("../../models/category")
const Comment = require("../../models/comment")
const Like = require("../../models/like");
const Dislike = require("../../models/dislike");
const sendEmail = require("../../middleware/nodemailer");
const like = require("./like");
require('dotenv').config();

const getPath = (path) => {
    return process.env.BASE_URL + "/" + path[path.length - 2] + "/" + path[path.length - 1];
};
// /api/list-baiviet?limit=5&page=2&filter=like&sort=desc&q=
module.exports = {
    getIdea: async (ctx) => {
        let page = ctx.query.page;
        let sort = ctx.query.sort;
        const pageSize = 5;
        const ideas = []
        if (page) {
            page = parseInt(page)
            const skip = (page - 1) * pageSize;
            const totalRecord = await Idea.find({}).count().lean()
            let allIdeas;
            if (sort === "like") {
                allIdeas = await Idea.find({}).skip(skip).limit(pageSize).populate("user", "-password").populate("category").populate("department").sort({ pointCount: 'DESC' }).lean();
            }
            else if (sort === "view") {
                allIdeas = await Idea.find({}).skip(skip).limit(pageSize).populate("user", "-password").populate("category").populate("department").sort({ viewCount: 'DESC' }).lean();
            }
            else {
                allIdeas = await Idea.find({}).skip(skip).limit(pageSize).populate("user", "-password").populate("category").populate("department").sort({ createdAt: 'DESC' }).lean();
            }
            const totalPage = totalRecord % 5 === 0 ? parseInt(totalRecord / 5) : parseInt(totalRecord / 5) + 1;
            for (allIdea of allIdeas) {
                const comments = await Comment.find({ idea: allIdea._id }).populate("user", "-password -idea").lean();
                const likes = await Like.find({ idea: allIdea._id }).count();
                const dislikes = await Dislike.find({ idea: allIdea._id }).count();
                allIdea = {
                    ...allIdea,
                    likes: likes,
                    dislikes: dislikes,
                    comments: comments,
                }
                ideas.push(allIdea)
            }

            return (ctx.body = {
                status: true,
                message: "get idea success",
                data: {
                    page,
                    totalPage,
                    totalRecord,
                    ideas
                }
            })
        }
        const idea = await Idea.find({}).lean();
        return (ctx.body = {
            status: true,
            message: "get idea success",
            data: {
                idea
            }
        })

    },

    getIdeaComment: async (ctx) => {
        const ideaId = ctx.params.id
        const user = ctx.state.user.user._id;
        if (!ideaId) {
            return (ctx.body = {
                status: false,
                message: "id not found",
            })
        }
        const idea = await Idea.findOne({
            _id: ideaId
        }).populate("user", "-password").populate("category", "categoryName -_id").populate("department", "departmentName -_id").lean();
        const comments = await Comment.find({
            idea: ideaId
        }).sort({
            createdAt: 'DESC'
        }).populate("user", "-password").lean();
        const likes = await Like.find({ idea: ideaId }).count();
        const dislikes = await Dislike.find({ idea: ideaId }).count();
        const liked = await Like.findOne({ user: user, idea: ideaId }).count();
        const disliked = await Dislike.findOne({ user: user, idea: ideaId }).count();
        if (!idea) {
            return (ctx.body = {
                status: false,
                message: "idea not found",
            })
        }

        return (ctx.body = {
            status: true,
            message: "get idea and comments success",
            data: {
                idea,
                likes,
                dislikes,
                comments,
                liked,
                disliked
            }
        })
    },


    createIdea: async (ctx) => {
        const idea = new Idea(ctx.request.body);
        const category = ctx.request.body.category;
        const thisCategory = await Category.findOne({
            _id: category
        }).select("isDisabled");
        if (thisCategory.isDisabled === true) {
            return (ctx.body = {
                status: false,
                message: "this category has been disabled"
            })
        }
        if (ctx.request.files.ideaFile) {
            for (let i = 0; i < ctx.request.files.ideaFile.length; i++) {
                let ideaFilePath = ctx.request.files.ideaFile[i].path.split("\\");
                idea.ideaFile[i] = getPath(ideaFilePath);
            }
        }

        if (ctx.request.files.ideaPicture) {
            let ideaPicturePath = ctx.request.files.ideaPicture[0].path.split("\\");
            idea.ideaPicture = getPath(ideaPicturePath);
        }


        const user = ctx.state.user;
        idea.user = user.user._id
        idea.department = user.department._id
        await idea.save();

        const role = await Role.findOne({
            roleName: "Quality Assurance Coordinator"
        }).lean();
        const userRole = await UserRole.findOne({
            user: user.user._id
        }).lean();
        const QAC = await UserRole.findOne({
            role: role._id,
            department: userRole.department
        }).populate("user", "email").lean();
        sendEmail({
            to: QAC.user.email,
            subject: "New idea",
            html: '<p>New Idea of your department has been added</p>',
        })
        return (ctx.body = {
            status: true,
            message: "create idea success"
        })
    },

    updateIdea: async (ctx) => {
        const id = ctx.params.id;
        const {
            ideaTitle,
            ideaContent
        } = ctx.request.body
        const user = ctx.state.user
        const idea = await Idea.findOne({
            _id: id
        }).lean()
        if (!idea) {
            return (ctx.body = {
                status: false,
                message: "no idea found",
            });
        }
        if (idea.user.toString() !== user.user._id.toString()) {
            return (ctx.body = {
                status: false,
                message: "cannot change others' idea",
            });
        }
        await Idea.updateOne({
            _id: id
        }, {
            ideaTitle: ideaTitle,
            ideaContent: ideaContent,
        });
        return (ctx.body = {
            status: true,
            message: "update idea success",
        });
    },

    deleteIdea: async (ctx) => {
        const id = ctx.params.id;
        const user = ctx.state.user
        if (!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: "id not found"
            })
        }
        const idea = await Idea.findOne({
            _id: id
        }).lean()
        if (idea.user.toString() !== user.user._id.toString()) {
            return (ctx.body = {
                status: false,
                message: "cannot delete others' idea",
            });
        }
        const deleteIdea = await Idea.deleteOne({
            _id: id
        });
        await Comment.deleteMany({ idea: id });
        await Like.deleteMany({ idea: id });
        await Dislike.deleteMany({ idea: id });

        if (deleteIdea.deletedCount === 0) {
            return (ctx.body = {
                status: false,
                message: 'no idea found to delete',
            });
        }

        return (ctx.body = {
            status: true,
            message: "delete idea success",
        });
    },

    agreeTerm: async (ctx) => {
        const isAgreedTerm = ctx.request.body.isAgreedTerm;
        const user = ctx.state.user
        if (Boolean(isAgreedTerm) === true) {
            await User.updateOne({
                _id: user.user._id
            }, {
                isAgreedTerm: true
            });
            return (ctx.body = {
                status: true,
                message: "user agreed term",
            });
        }

        return (ctx.body = {
            status: false,
            message: "user not agreed term",
        });
    },
}