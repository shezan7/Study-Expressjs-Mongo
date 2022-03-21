const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const db = require('../config/db')

exports.checkAccess = (access) => {
    return roleValid = async (req, res, next) => {

        const AccesslistInfo = await db.query(`
            SELECT 
                r.accesslist 
            FROM 
                shezan.users u, 
                shezan.user_role_mapping urm, 
                shezan.roles r
            WHERE 
                u.id = urm.user_id and 
                u.id= ${req.user.id} AND
                urm.role_id = r.id
        `, {
            type: QueryTypes.SELECT
        })
        if (AccesslistInfo[0].accesslist) {
            if (AccesslistInfo[0].accesslist.findIndex(el => el === access) === -1) {
                res.status(401).json({
                    status: "Failed",
                    message: "Unauthorized! You have no access"
                })
            } else {
                return next();
            }
        } else {
            res.status(401).json({
                status: "Failed",
                message: "No accesslist found"
            })
        }
        // console.log(AccesslistInfo)
        // if (roles.includes(req.user.role)) {
        //     // if (roles.includes(req.user.role.id)) {
        //     return next()
        // } else {
        //     res.status(401).json({
        //         status: "Failed",
        //         message: "Unauthorized! You have no access"
        //     })
        // }
    }
}