const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const db = require('../config/db')

exports.checkUser = (access) => {
    return roleValid = async (req, res, next) => {
        const AccesslistInfo = await db.query(
            `SELECT 
                u.*,
                (SELECT 
                    r.accesslist 
                FROM 
                    shezan.user_role_mapping urm, 
                    shezan.roles r 
                WHERE 
                    u.id = urm.user_id  
                    AND urm.role_id = r.id)
            FROM 
                shezan.users u
            WHERE 
                u.id= ${req.user.id};`
            , {
                type: QueryTypes.SELECT
            })
        if (AccesslistInfo[0].accesslist) {
            //console.log(AccesslistInfo[0].accesslist, access)
            if (AccesslistInfo[0].accesslist.findIndex(element => element === access) === -1) {
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