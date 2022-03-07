const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const {INTEGER, STRING} = DataTypes

const product = sequelize.define('product', {
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
    schema: "shezan",
    timestamps: true
})

module.exports = product 