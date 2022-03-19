const Category = require("../../models/category");
const Idea = require("../../models/idea");

module.exports = {
    getCategory: async(ctx) => {
        const category = await Category.find({}).lean();
        return (ctx.body = {
            status: true,
            message: 'get category success',
            category,
        });
    },

    updateCategory: async(ctx) => {
        const id = ctx.request.params.id;
        const {
            startDate,
            firstClosureDate,
            finalClosureDate,
        } = ctx.request.body;
        await Category.updateOne({
            _id: id,
        }, {
            startDate: startDate,
            firstClosureDate: firstClosureDate,
            finalClosureDate: finalClosureDate,
        });
        return (ctx.body = {
            status: true,
            message: "update category success",
        });
    },

    createCategory: async(ctx) => {
        const category = new Category(ctx.request.body);
        await category.save();
        return (ctx.body = {
            status: true,
            message: 'create category success',
        });
    },

    deleteCategory: async (ctx) => {
        const id = ctx.request.params.id

        if (!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: 'id not found',
            });
        }

        const idea = await Idea.findOne({ category: id }).lean()
        if(idea) {
            return (ctx.body = {
                status: false,
                message: "category is being used",
            });
        }

        await Category.deleteOne({
            _id: id,
        });
        return (ctx.body = {
            status: true,
            message: 'delete category success',
        });
    },
};
