const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const role = sequelize.define('role', {
    name: {
        type: STRING,
        allowNull: false
    },
    // description: {
    //     type: STRING,
    //     allowNull: false
    // },
    accesslist: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = role


// access: name, manager/service/module
// Role: name, description, accesslist
// userRoleMapping: userid, roleid