const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const {INTEGER, STRING} = DataTypes

const user = sequelize.define('user', {
    name: {
        type: STRING,
        allowNull: false
    },
    price: {
        type: INTEGER,
        allowNull: false
    },
    image: {
        type: STRING
    }
}, {
    schema: "shezan"
})

module.exports = user 