const sequelizeUser = require('../sequelize-models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../config/db')
const { QueryTypes } = require('sequelize')


exports.users_signup = async (req, res, next) => {
    console.log("users_register", req.body);
    const { email, password } = req.body;
    try {
        const newUser = await sequelizeUser.create({
            email: email,
            password: bcrypt.hashSync(password, 12)
        })

        if (!newUser) {
            const error = new Error('User not created!');
            error.status = 500;
            throw error;
        }
        console.log(newUser);
        res.status(200).json({
            data: "User registered successfully", newUser
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}


exports.users_login = async (req, res, next) => {

    console.log("users_login", req.body);

    const { email, password } = req.body;

    try {

        const user = await db.query(
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
                u.email= '${email}';`
            , {
                type: QueryTypes.SELECT
            })


        if (!user[0]) {
            return res.status(404).send({ message: "User Not found." });
        }

        if (user[0].password == bcrypt.hashSync(password, 12)) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }

        const jwtToken = jwt.sign({
            id: user[0].id,
            access: user[0].accesslist
        }, process.env.JWT_KEY,
            {
                expiresIn: "8h"
            })

        res.status(200).json({
            data: "User login successfull",
            token: jwtToken
        })


    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.make_admin = async (req, res, next) => {
    console.log("users_info", req.body);

    const { id } = req.body;
    console.log(req.role)
    try {
        const user = await sequelizeUser.update({
            role: 'editor',
        }, {
            where: {
                id
            }
        })

        if (!user) {
            return res.status(404).send({ message: "No user found for making admin" });
        }

        res.status(200).json({
            message: "Make admin successfull"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

    // if (req.role !== 'admin') {
    //     const error = new Error("Permission denied!");
    //     error.statusCode = 401;
    //     return next(error);
    // }

    // else {
    //     try {
    //         const user = await sequelizeUser.update({
    //             role: 'editor',
    //         }, {
    //             where: {
    //                 id
    //             }
    //         })

    //         if (!user) {
    //             return res.status(404).send({ message: "No user found for making admin" });
    //         }

    //         res.status(200).json({
    //             message: "Make admin successfull"
    //         })

    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         })
    //     }
    // }
}

exports.users_delete = async (req, res, next) => {
    console.log("users_remove", req.body);

    const { id } = req.body;
    console.log(req.role)
    try {
        const user = await sequelizeUser.destroy({
            where: {
                id
            }
        })

        if (!user) {
            return res.status(404).send({ message: "User is not found for deleting" });
        }

        res.status(200).json({
            message: "User removed successfully"
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

    // if (req.role !== 'admin') {
    //     const error = new Error("Permission denied!");
    //     error.statusCode = 401;
    //     return next(error);
    // }

    // else {
    //     try {
    //         const user = await sequelizeUser.destroy({
    //             where: {
    //                 id
    //             }
    //         })

    //         if (!user) {
    //             return res.status(404).send({ message: "User is not found for deleting" });
    //         }

    //         res.status(200).json({
    //             message: "User removed successfully"
    //         })


    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         })
    //     }
    // }

}