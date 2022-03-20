const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER, STRING } = DataTypes

const role = sequelize.define('role', {
    name: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    accesslist: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = role


// Role: name, description, accesslist
// access: name, manager
// userRoleMapping: userid, roleid