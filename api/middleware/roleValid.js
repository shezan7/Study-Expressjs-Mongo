const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const db = require('../config/db')

exports.checkUser = (access) => {
    return roleValid = async (req, res, next) => {
        if (req.user.access) {
            if (req.user.access.findIndex(element => element === access) === -1) {
                res.status(401).json({
                    status: "Failed",
                    message: "Unauthorized! You have no access"
                })
            }
            else {
                return next();
            }
        }
        else {
            res.status(401).json({
                status: "Failed",
                message: "Not Permitted!!"
            })
        }
    }
}