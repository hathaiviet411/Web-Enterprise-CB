<<<<<<< Updated upstream:controllers/admin/register.js
const User = require('../../models/user');
const Role = require('../../models/role');
const UserRole = require('../../models/userRole');
const bcrypt = require('bcrypt');
=======
const User = require("../../models/user");
const Role = require("../../models/role");
const UserRole = require("../../models/userRole");
const Department = require("../../models/department")
const bcrypt = require("bcrypt");
>>>>>>> Stashed changes:controllers/main/register.js
const saltRounds = 10;

module.exports = {
    addRole: async(ctx) => {
        const { roleName } = ctx.request.body;
        if (!roleName || roleName === undefined) {
            return (ctx.body = {
                status: false,
                message: 'No role to add',
            });
        }
        const role = new Role({ roleName: roleName });

        await role.save();
        return (ctx.body = {
            status: true,
            message: 'Role successfully created',
        });
    },

<<<<<<< Updated upstream:controllers/admin/register.js
    getRole: async(ctx) => {
        const role = await Role.find({}).select('-__v').lean();
        return (ctx.body = {
            status: true,
            message: 'Get all role success',
            role: role,
        });
    },
=======
  getRole: async (ctx) => {
    const role = await Role.find({}).select("-__v").lean();
    const department = await Department.find({}).select("-__v").lean();
    return (ctx.body = {
      status: true,
      message: "Get all role success",
      role,
      department,
    });
  },
>>>>>>> Stashed changes:controllers/main/register.js

    deleteRole: async(ctx) => {
        const { id } = ctx.request.params;
        console.log(id);
        if (!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: 'delete role failed',
            });
        }
        await Role.deleteOne({ _id: id });
        return (ctx.body = {
            status: true,
            message: 'delete role success',
        });
    },

<<<<<<< Updated upstream:controllers/admin/register.js
    register: async(ctx) => {
        const { username, email, password, roleId, name } = ctx.request.body;
        const existAccount = await User.findOne({
            username: username,
        });
        if (existAccount) {
            return (ctx.body = {
                status: false,
                message: 'Account existed',
            });
        } else {
            const hash = bcrypt.hashSync(password, saltRounds);
            const user = new User({
                username: username,
                email: email,
                password: hash,
                name: name,
            });
            await user.save();
            const userRole = new UserRole({
                user: user._id,
                role: roleId,
            });
            await userRole.save();
            return (ctx.body = {
                status: true,
                message: 'Account successfully created',
            });
        }
    },
=======
  register: async (ctx) => {
    let { username, email, password, roleId, departmentId, name } = ctx.request.body;
    const existAccount = await User.findOne({
      username: username,
    });
    if (existAccount)
      return (ctx.body = {
        status: false,
        message: "Account existed",
      });
    else {
      let hash = bcrypt.hashSync(password, saltRounds);
      let user = new User({
        username: username,
        email: email,
        password: hash,
        name: name,
      });
      await user.save();
      let userRole = new UserRole({
        user: user._id,
        role: roleId,
        department: departmentId
      });
      await userRole.save();
      return (ctx.body = {
        status: true,
        message: "Account successfully created",
      });
    }
  },
>>>>>>> Stashed changes:controllers/main/register.js
};
