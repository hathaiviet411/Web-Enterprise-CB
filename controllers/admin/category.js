const category = require('../../models/category');
const Category = require('../../models/category');

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
            message: 'delete category success',
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

    deleteCategory: async(ctx) => {
        const id = ctx.request.params.id;
        if (!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: 'id not found',
            });
        }

        await category.deleteOne({
            _id: id,
        });
        return (ctx.body = {
            status: true,
            message: 'delete category success',
        });
    },
};
