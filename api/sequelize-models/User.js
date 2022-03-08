const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const {INTEGER, STRING} = DataTypes

const user = sequelize.define('user', {
    email: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "shezan"
})

module.exports = user 