const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING, INTEGER } = DataTypes

const role = sequelize.define('roles', {
    name: {
        type: STRING,
        allowNull: false
    },
    // description: {
    //     type: STRING,
    //     allowNull: false
    // },
    accesslist: {
        type: [INTEGER],
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: false,
    freezeTableName: true
})

module.exports = role


// access: name, manager/service/module
// Role: name, description, accesslist
// userRoleMapping: userid, roleid