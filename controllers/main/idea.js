const Idea = require("../../models/idea");
const User = require("../../models/user");
const UserRole = require("../../models/userRole");
const Role = require("../../models/role");
const sendEmail = require("../../middleware/nodemailer")
require('dotenv').config();

const getPath = (path) => {
    return process.env.BASE_URL + "/" + path[path.length - 2] + "/" + path[path.length - 1];
};

module.exports = {
    getIdea: async (ctx) => {
        const idea = await Idea.find({}).lean();
        return (ctx.body = {
            status: true,
            message: "get idea success",
            idea
        })
    },

    createIdea: async (ctx) => {
        const idea = new Idea(ctx.request.body);
        console.log(ctx.request.files)
        for (let i = 0; i < ctx.request.files.ideaFile.length; i++) {
            let ideaFilePath = ctx.request.files.ideaFile[i].path.split("\\");
            idea.ideaFile[i] = getPath(ideaFilePath);
        }

        const a = await idea.save();
        console.log(a)
        const user = ctx.state.user;
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
            subject: "New idea"
        })
        return (ctx.body = {
            status: true,
            message: "create idea success"
        })
    },

    updateIdea: async (ctx) => {
        const id = ctx.request.params.id;
        const {
            ideaContent
        } = ctx.request.body
        const user = ctx.state.user
        const idea = await Idea.findOne({
            _id: id
        }).lean()
        if (idea.user.toString() !== user.toString()) {
            return (ctx.body = {
                status: false,
                message: "cannot change others' idea",
            });
        }
        await Idea.updateOne({
            _id: id
        }, {
            ideaContent: ideaContent,
        });
        return (ctx.body = {
            status: true,
            message: "update idea success",
        });
    },

    deleteIdea: async (ctx) => {
        const id = ctx.request.params.id;
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
        if (idea.user.toString() !== user.toString()) {
            return (ctx.body = {
                status: false,
                message: "cannot delete others' idea",
            });
        }
        const deleteIdea = await Idea.deleteOne({
            _id: id
        })

        if (deleteIdea.deletedCount === 0) {
            return (ctx.body = {
                status: false,
                message: 'no idea found',
            });
        }

        return (ctx.body = {
            status: true,
            message: "delete idea success",
        });
    },
}