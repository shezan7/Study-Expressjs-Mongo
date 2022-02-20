const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})


router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
        .save()
        .then(result => {
        console.log(result)


        res.status(200).json({
                message: 'Handling POST requests to /products',
                createProduct: result
            })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

        // res.status(200).json({
        //              message: 'Handling POST requests to /products',
        //              createProduct: product
        //          })



})





// router.post('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Handling POST requests to /products'
//     })
// })

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc)
            // res.status(200).json(doc)
            if(doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({message: 'No valid entry found for provided ID'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        }) 


    // Product.findById(id)
    //     .exec()
    //     .then(doc => {
    //         console.log(doc)
    //         res.status(200).json(doc)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({error: err})
    // }) 
        

    // if(id === 'special') {
    //     res.status(200).json({
    //         message: 'You discovered the special ID',
    //         id: id
    //     })
    // } else {
    //     res.status(200).json({
    //         message: 'You passed an ID',
    //         id: id
    //     })
    // }
})




router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
   
    // Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice}})
    
    const updateOperation = {}
    for(const operation of req.body) {
        updateOperation[operation.propName] = operation.value
    }
    Product.update({_id: id}, {$set: updateOperation})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }) 

})


// router.patch('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Updated product!'
//     })
// })


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }) 
})


// router.delete('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Deleted product!'
//     })
// })

module.exports = router