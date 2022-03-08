const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const {INTEGER, STRING} = DataTypes

const order = sequelize.define('order', {
    product: {
        type: STRING,
        allowNull: false
    },
    quantity: {
        type: INTEGER
        //allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true
})

module.exports = order 