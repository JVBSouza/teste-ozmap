const Users = require("../models/userModel");

const getAllUsers = async (ctx, next) => {
  const page = Number(ctx.query.page || 0);
  const size = Number(ctx.query.size || 10);
  const user = await Users.findAll({
    limit: size,
    offset: page * size,
  });
  ctx.body = user;
};

const getUser = async (ctx, next) => {
  const name = ctx.params.name;
  const user = await Users.findOne({ where: { name } });
  if (!user) {
    ctx.throw(404, "User not found");
    ctx.body = {};
  } else {
    ctx.status = 200;
    ctx.body = user;
  }
};

const createUser = async (ctx, next) => {
  const newUser = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    age: ctx.request.body.age,
  };
  if (newUser.age < 18) {
    ctx.throw(400, "Underage user not allowed");
    ctx.body = {};
  } else {
    const user = await Users.create(newUser);
    ctx.status = 201;
    ctx.body = user;
  }
};

const deleteUser = async (ctx, next) => {
  const name = ctx.params.name;
  await Users.destroy({ where: { name } }).then((response) => {
    if (response == 0) {
      ctx.throw(404, "User not found");
      ctx.body = {};
    } else {
      ctx.status = 204;
      ctx.body = {};
    }
  });
};

const updateUser = async (ctx, next) => {
  const name = ctx.params.name;
  const { ...body } = ctx.request.body;
  await Users.update(body, { where: { name } }).then((response) => {
    console.log(response);
    if (response == 0) {
      ctx.throw(404, "User not found");
      ctx.body = {};
    } else {
      ctx.status = 200;
      ctx.body = "User updated";
    }
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
