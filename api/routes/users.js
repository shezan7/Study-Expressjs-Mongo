const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');


router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

// router.delete("/", UsersController.users_delete);


module.exports = router


/*
router.post('/signup', (req, res, next) => {
    
    // const user = new User({
    //     _id: new Mongoose.Types.ObjectId(),
    //     email: req.body.email,
    //     password: hash
        
        // bcrypt.hash(req.body.password, 10, (err, hash) => {
        //     if(err) {
        //         return res.status(500).json({
        //             error: err
        //         })
        //     }
        //     else {
        //         const user = new User({
        //             _id: new mongoose.Types.ObjectId(),
        //             email: req.body.email,
        //             password: hash 
        //         })

        //         user
        //             .save()
        //             .then(result => {
        //                 console.log(result)
        //                 res.status(201).json({
        //                     message: 'User created'
        //                 })
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 res.status(500).json({
        //                     error: err 
        //                 })
        //             })
        //     }
        // })
 // })

    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail already exixsts'
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash 
                        })
        
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err 
                                })
                            })
                    }
                })
            }
        })

})
*/

/*
router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Authentication failed!'
                    })
                }
                if(result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: 'Succesfully Authenticated',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Authentication failed!'
                })
            })   
        })           
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err 
            })
        })

    })
*/