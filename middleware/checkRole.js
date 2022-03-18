const verifyAdmin = (user) => {
  return user.role.roleName === "Admin";
};

const verifyQAManager = (user) => {
  return user.role.roleName === "Quality Assurance Manager";
};

const verifyQACoordinator = (user) => {
  return user.role.roleName === "Quality Assurance Coordinator";
};
const verifyStaff = (user) => {
  return user.role.roleName === "Staff";
};

module.exports = {
  checkAdmin: (ctx, next) => {
    const user = ctx.state.user;
    if (!verifyAdmin(user)) {
      ctx.status = 401;
      return (ctx.body = {
        status: false,
        message: "User not allowed",
      });
    }
    return next();
  },

  checkQAM: (ctx, next) => {
    const user = ctx.state.user;
    console.log(user.role.roleName)
    if (!verifyQAManager(user)) {
      ctx.status = 401;
      return (ctx.body = {
        status: false,
        message: "User not allowed",
      });
    }
    return next();
  },
};
