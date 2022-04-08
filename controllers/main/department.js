const Department = require("../../models/department");
const UserRole = require("../../models/userRole");
const Idea = require("../../models/idea");

module.exports = {
  addDepartment: async (ctx) => {
    const { departmentName } = ctx.request.body;
    if (!departmentName || departmentName === undefined) {
      return (ctx.body = {
        status: false,
        message: "No department to add",
      });
    }
    const department = new Department({
      departmentName: departmentName,
    });

    await department.save();
    return (ctx.body = {
      status: true,
      message: "Department successfully created",
    });
  },

  deleteDepartment: async (ctx) => {
    const { id } = ctx.request.params;

    if (!id || id === undefined) {
      return (ctx.body = {
        status: false,
        message: "delete department failed",
      });
    }
    const deleteDepartment = await Department.deleteOne({
      _id: id,
    });

    if (deleteDepartment.deletedCount === 0) {
      return (ctx.body = {
        status: false,
        message: "no department found to delete",
      });
    }

    return (ctx.body = {
      status: true,
      message: "delete department success",
    });
  },

  getDepartment: async (ctx) => {
    const departments = await Department.find({}).select("-__v").lean();
    let departmentStatistic = [];
    for (let department of departments) {
      const departmentIdea = await Idea.find({
        department: department._id,
      }).count();
      const contributor = await Idea.find({
        department: department._id,
      }).distinct("user");
      department = {
        ...department,
        numberOfIdea: departmentIdea,
        numberOfContributor: contributor.length,
      };
      departmentStatistic.push(department);
    }

    return (ctx.body = {
      status: true,
      message: "Get department info success",
      departmentStatistic,
    });
  },
};
