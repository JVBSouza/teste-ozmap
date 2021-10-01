const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ozmap-db', 'username', 'password', {
    "dialect": "sqlite",
    "host": "./dev.sqlite"
})

module.exports = sequelize;