const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ozmap-db", "username", "password", {
  dialect: "sqlite",
  host: process.env.NODE_ENV == "dev" ? "./dev.sqlite" : "./test.sqlite",
});

module.exports = sequelize;
