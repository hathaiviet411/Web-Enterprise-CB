const Department = require("../../models/department");
const userRole = require("../../models/userRole");
const UserRole = require("../../models/userRole")

module.exports = {
    addDepartment: async (ctx) => {
        const {
            departmentName
        } = ctx.request.body;
        if (!departmentName || departmentName === undefined) {
            return (ctx.body = {
                status: false,
                message: 'No department to add',
            });
        }
        const department = new Department({
            departmentName: departmentName
        });

        await department.save();
        return (ctx.body = {
            status: true,
            message: 'Department successfully created',
        });
    },

    deleteDepartment: async (ctx) => {
        const {
            id
        } = ctx.request.params;

        if (!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: 'delete department failed',
            });
        }
        const deleteDepartment = await Department.deleteOne({
            _id: id
        });

        if (deleteDepartment.deletedCount === 0) {
            return (ctx.body = {
                status: false,
                message: 'no department found to delete',
            });
        }

        return (ctx.body = {
            status: true,
            message: 'delete department success',
        });
    },

    getDepartment: async (ctx) => {
        const departments = await Department.find({}).select("-__v").lean();
        const departmentStatistic = []
        for (let department of departments) {
            const user = await userRole.find({ department: department._id }).populate("user").lean()
            departmentStatistic.push(user)
        }
        return (ctx.body = {
            status: true,
            message: "Get all role success",
            department,
        });
    }
}
