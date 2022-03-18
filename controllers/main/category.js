<<<<<<< Updated upstream:controllers/admin/category.js
const category = require('../../models/category');
const Category = require('../../models/category');
=======
const Category = require("../../models/category");
const Idea = require("../../models/idea");
>>>>>>> Stashed changes:controllers/main/category.js

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
<<<<<<< Updated upstream:controllers/admin/category.js
            message: 'delete category success',
=======
            message: "update category success",
>>>>>>> Stashed changes:controllers/main/category.js
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

<<<<<<< Updated upstream:controllers/admin/category.js
    deleteCategory: async(ctx) => {
        const id = ctx.request.params.id;
=======
    deleteCategory: async (ctx) => {
        const id = ctx.request.params.id

>>>>>>> Stashed changes:controllers/main/category.js
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

        await category.deleteOne({
            _id: id,
        });
        return (ctx.body = {
            status: true,
            message: 'delete category success',
        });
    },
};
