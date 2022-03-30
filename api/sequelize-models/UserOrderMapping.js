const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const userOrderMapping = sequelize.define('user_order_mapping', {
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    order_id: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "shezan",
    timestamps: false,
    freezeTableName: true
})

module.exports = userOrderMapping 