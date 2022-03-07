const mongoose = require("mongoose");

// const Order = require("../models/order");
const Product = require("../models/product");

const sequelizeOrder = require('../sequelize-models/Product')

exports.products_get_all = (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
}

exports.products_create = (req, res, next) => {
    console.log("products_create",req.body);

    
    // const product = new Product({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     price: req.body.price
    // })

    // product
    //     .save()
    //     .then(result => {
    //         console.log(result)


    //         res.status(200).json({
    //             message: 'Handling POST requests to /products',
    //             createProduct: result
    //         })

    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         })
    //     })

}

exports.products_create_with_photo = async(req, res, next) => {

    const filePath = req.files.photo.tempFilePath

    const cloudInfo = await cloudinary.uploader.upload(filePath)

    fs.unlinkSync(filePath);


    console.log(req.body);

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: cloudInfo.url
    })

    product
        .save()
        .then(result => {
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
}

exports.products_get_product_id = (req, res, next) => {
    const id = req.params.productId

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc)
            // res.status(200).json(doc)
            if (doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({ message: 'No valid entry found for provided ID' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.products_update = (req, res, next) => {
    const id = req.params.productId

    // Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice}})

    const updateOperation = {}
    for (const operation of req.body) {
        updateOperation[operation.propName] = operation.value
    }
    Product.update({ _id: id }, { $set: updateOperation })
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

}

exports.products_delete = (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
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
}