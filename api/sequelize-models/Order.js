const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const order = sequelize.define('order', {
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER
        //allowNull: false
    }
}, {
    schema: "shezan"
})

module.exports = order 