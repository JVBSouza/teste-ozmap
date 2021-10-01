const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database')

class User extends Model {
}

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.NUMBER
    }
}, {
    sequelize,
    modelName: 'User'
}
)

module.exports = User;