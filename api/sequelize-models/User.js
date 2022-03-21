const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const user = sequelize.define('user', {
    email: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    // role: {
    //     type: STRING,
    //     // allowNull: false
    // }
}, {
    schema: "shezan",
    timestamps: true,

    indexes: [
        // Create a unique index on email
        {
            unique: true,
            fields: ['email']
        }]
})

module.exports = user 