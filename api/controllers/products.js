const mongoose = require("mongoose");
const product = require("../models/product");

// const Order = require("../models/order");
const Product = require("../models/product");

const sequelizeProduct = require('../sequelize-models/Product')

exports.products_get_all = async (req, res, next) => {
    console.log("products",req.body);

    try {
        //const { id } = req.body;
        const productAll = await sequelizeProduct.findAll({
            // where: {
            //     id
            // }

            attributes: ['id', 'name', 'price']
        
        })
    
        res.json({
            message: productAll
        })
    } catch (error) {
        next(error);
    }
}

exports.products_create = async (req, res, next) => {
    console.log("products_create",req.body);

    try {
        const { name, price } = req.body;
        const newProduct = await sequelizeProduct.create({
            name,
            price,

            // attributes: ['id', 'name', 'price']

        })
    
        res.json({
            data: newProduct
        })
    } catch (error) {
        next(error);
    }
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

exports.products_get_product_id = async (req, res, next) => {
    console.log("product_id",req.body);

    try {
        const { id } = req.body;
        const productId = await sequelizeProduct.findAll({
            attributes: ['id', 'name', 'price'],
            where: {
                id
            }
        })
    
        res.json({
            message: "ProductId find successfully", productId
        })
    } catch (error) {
        next(error);
    }
}

exports.products_update = async (req, res, next) => {
    console.log("products_updated",req.body);

    try {
        const { id, name, price } = req.body;
        // const product = await sequelizeProduct.create({
        //     name,
        //     price,
        // })
        await sequelizeProduct.update({
            name,
            price
        }, {
            where: {
                id
            }
        })
    
        res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        next(error);
    }
}

exports.products_delete = async (req, res, next) => {
    console.log("products_deleted",req.body);

    try {
        const { id } = req.body;
        await sequelizeProduct.destroy({
            where: {
                id
            }
        })
    
        res.json({
            message: "Deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}