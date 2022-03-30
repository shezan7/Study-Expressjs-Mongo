const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const order = sequelize.define('orders', {
    product_id: {
        type: INTEGER,
        allowNull: false
    },
    quantity: {
        type: INTEGER
        //allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: true,
    freezeTableName: true
})

module.exports = order 