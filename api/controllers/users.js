const sequelizeUser = require('../sequelize-models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        const user = await sequelizeUser.findAll({
            where: { email }
        })

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (user.password != password) {
            return res.status(401).send({
                // accessToken: null,
                message: "Invalid Password!"
            });
        }
        const jwtToken = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            })

        res.status(200).json({
            data: "User login successfull",
            token: jwtToken
        })
    }


    // catch (error) {
    //     next(error);
    // }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

}

exports.users_delete = async (req, res, next) => {
    console.log("users_remove", req.body);

    // try {
    //     const { id } = req.body;
    //     await sequelizeUser.destroy({
    //         where: {
    //             id
    //         }
    //     })

    //     res.status(200).json({
    //         message: "User removed successfully"
    //     })

    const { id } = req.body;
    try {
        await sequelizeUser.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            message: "User removed successfully"
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}