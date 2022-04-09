const Role = require("../../models/role");

module.exports = {
  addRole: async (ctx) => {
    const { roleName } = ctx.request.body;
    if (!roleName || roleName === undefined) {
      return (ctx.body = {
        status: false,
        message: "No role to add",
      });
    }
    const role = new Role({
      roleName: roleName,
    });

    await role.save();
    return (ctx.body = {
      status: true,
      message: "Role successfully created",
    });
  },

  getRole: async (ctx) => {
    const role = await Role.find({}).select("-__v").lean();
    return (ctx.body = {
      status: true,
      message: "Get all role success",
      role,
    });
  },

  deleteRole: async (ctx) => {
    const { id } = ctx.request.params;

    if (!id || id === undefined) {
      return (ctx.body = {
        status: false,
        message: "delete role failed",
      });
    }
    const deleteRole = await Role.deleteOne({
      _id: id,
    });
    if (deleteRole.deletedCount === 0) {
      return (ctx.body = {
        status: false,
        message: "no role found to delete",
      });
    }
    return (ctx.body = {
      status: true,
      message: "delete role success",
    });
  },
};
