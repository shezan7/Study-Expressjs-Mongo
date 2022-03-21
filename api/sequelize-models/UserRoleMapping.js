const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const userRoleMapping = sequelize.define('userRoleMapping', {
    userId: {
        type: INTEGER,
        allowNull: false
    },
    roleId: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = userRoleMapping 