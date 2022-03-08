const mongoose = require("mongoose");

const User = require("../models/user");
// const Product = require("../models/product");

const sequelizeUser = require('../sequelize-models/User')

exports.users_signup = async (req, res, next) => {
    console.log("users_register",req.body);

    try {
        const { email, password } = req.body;
        const newUser = await sequelizeUser.create({
            email,
            password
        })
    
        res.json({
            data: "User registered successfully", newUser
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
    
    



    // User.find({email: req.body.email})
    //     .exec()
    //     .then(user => {
    //         if(user.length >= 1) {
    //             return res.status(409).json({
    //                 message: 'Mail already exixsts'
    //             })
    //         }
    //         else {
    //             bcrypt.hash(req.body.password, 10, (err, hash) => {
    //                 if(err) {
    //                     return res.status(500).json({
    //                         error: err
    //                     })
    //                 }
    //                 else {
    //                     const user = new User({
    //                         _id: new mongoose.Types.ObjectId(),
    //                         email: req.body.email,
    //                         password: hash 
    //                     })
        
    //                     user
    //                         .save()
    //                         .then(result => {
    //                             console.log(result)
    //                             res.status(201).json({
    //                                 message: 'User created'
    //                             })
    //                         })
    //                         .catch(err => {
    //                             console.log(err)
    //                             res.status(500).json({
    //                                 error: err 
    //                             })
    //                         })
    //                 }
    //             })
    //         }
    //     })

}

exports.users_login = async (req, res, next) => {
    
    console.log("users_login",req.body);

    try {
        const { email, password } = req.body;
        const User = await sequelizeUser.findOne({
            
            attributes: ['email'],
            
            where: {
                email
            }
        })
    
        res.json({
            data: "User login successfull", User
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



    
    // User.find({email: req.body.email})
    //     .exec()
    //     .then(user => {
    //         if(user.length < 1) {
    //             return res.status(401).json({
    //                 message: 'Authentication failed!'
    //             })
    //         }
    //         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    //             if(err) {
    //                 return res.status(401).json({
    //                     message: 'Authentication failed!'
    //                 })
    //             }
    //             if(result) {
    //                 const token = jwt.sign(
    //                     {
    //                         email: user[0].email,
    //                         userId: user[0]._id
    //                     }, 
    //                     process.env.JWT_KEY,
    //                     {
    //                         expiresIn: "1h"
    //                     }
    //                 )
    //                 return res.status(200).json({
    //                     message: 'Succesfully Authenticated',
    //                     token: token
    //                 })
    //             }
    //             return res.status(401).json({
    //                 message: 'Authentication failed!'
    //             })
    //         })   
    //     })           
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err 
    //         })
    //     })

}

exports.users_delete = async (req, res, next) => {
    console.log("users_remove",req.body);

    try {
        const { id } = req.body;
        await sequelizeUser.destroy({
            where: {
                id
            }
        })
    
        res.json({
            message: "User removed successfully"
        })
    } catch (error) {
        next(error);
    }
}