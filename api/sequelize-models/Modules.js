const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const module = sequelize.define('module', {
    name: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = module 