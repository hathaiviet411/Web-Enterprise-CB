const category = require("../../models/category");
const Category = require("../../models/category")

module.exports = {
    getCategory: async (ctx) => {
        const category = await Category.find({}).lean();
        return (ctx.body = {
            status: true,
            message: "get category success",
            category
        })
    },

    updateCategory: async (ctx) => {
        const id = ctx.request.params.id
        const {
            startDate,
            firstClosureDate,
            finalClosureDate
        } = ctx.request.body
        await Category.updateOne({
            _id: id
        }, {
            startDate: startDate,
            firstClosureDate: firstClosureDate,
            finalClosureDate: finalClosureDate
        });
        return (ctx.body = {
            status: true,
            message: "delete category success",
        });
    },
}