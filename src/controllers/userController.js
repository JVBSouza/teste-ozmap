const Users = require("../models/userModel")
const Router = require('koa-router');

// const router = new Router();
// const parser = new bodyParser();

const getAllUsers = async (ctx, next) => {
    const user = await Users.findAll();
    ctx.body = user;
};

const getUser = async (ctx, next) => {
    const id = ctx.params.id;
    const user = await Users.findOne({ where: { id } });
    ctx.body = user;
};

const createUser = async (ctx, next) => {
    const newUser = {
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        age: ctx.request.body.age
    };

    const user = await Users.create(newUser);
    ctx.body = user;
};

const deleteUser = async (ctx, next) => {
    const id = ctx.params.id;
    await Users.destroy({ where: { id } });
    ctx.body = {};
};

const updateUser = async (ctx, next) => {
    const id = ctx.params.id
    const { ...body } = ctx.request.body;
    const user = await Users.update(body, { where: { id } });
    ctx.body = user;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };



