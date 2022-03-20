const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER, STRING } = DataTypes

const access = sequelize.define('access', {
    name: {
        type: STRING,
        allowNull: false
    },
    manager: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = access 