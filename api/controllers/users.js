const sequelizeUser = require('../sequelize-models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.users_signup = async (req, res, next) => {
    console.log("users_register", req.body);
    const { email, password, role } = req.body;
    // let isAdmin = false;
    try {
        // switch (role) {
        //     case 'admin':
        //         isAdmin = true
        //         break;
        //     case 'user':
        //         isAdmin = false
        //         break;
        //     default:
        //         const error = new Error;
        //         error.status = 'Sorry, You are not a valid user';
        //         throw error;
        // }

        const newUser = await sequelizeUser.create({
            email: email,
            password: bcrypt.hashSync(password, 12),
            role: role,
            // isAdmin: isAdmin
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
        const user = await sequelizeUser.findOne({
            where: {
                email: email,
            }
        })

        // console.log(user);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        if (user.password == bcrypt.hashSync(password, 12)) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }

        const jwtToken = jwt.sign({
            id: user.id,
            // email: user.email,
            role: user.role
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

    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

}

exports.users_delete = async (req, res, next) => {
    console.log("users_remove", req.body);

    const { id } = req.body;
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
}