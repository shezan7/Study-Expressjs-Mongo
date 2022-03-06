const {DataTypes} = require('sequelize')

const sequelize = require('../config/db');

const product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    schema: "shezan"
})

module.exports = product 