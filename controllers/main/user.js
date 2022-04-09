const User = require("../../models/user");
const Role = require("../../models/role");
const Department = require("../../models/department")
const UserRole = require("../../models/userRole");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  getRegister: async (ctx) => {
    const role = await Role.find({}).select("-__v").lean();
    const departments = await Department.find({}).select("-__v").lean();
    return (ctx.body = {
      status: true,
      message: "Get all role success",
      role,
      departments
    });
  },

  register: async (ctx) => {
    let {
      username,
      email,
      password,
      roleId,
      departmentId,
      name
    } = ctx.request.body;
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
      
      let userRole = new UserRole({
        user: user._id,
        role: roleId,
        department: departmentId
      });
      await userRole.save();
      await user.save();
      return (ctx.body = {
        status: true,
        message: "Account successfully created",
      });
    }
  },

  getAllUser: async (ctx) => {
    const user = await UserRole.find({}).populate({
      path: 'role',
      select: '-__v'
    })
      .populate({
        path: 'user',
        select: '-__v -createdAt -updatedAt -password',
      })
      .populate({
        path: 'department',
        select: '-__v -createdAt -updatedAt',
      })
      .select('-__v -_id').lean();
    return (ctx.body = {
      status: true,
      message: "get all user success",
      user
    })
  },
};