const sequelizeProduct = require('../sequelize-models/Product')

exports.products_get_all = async (req, res, next) => {
    console.log("products", req.body);

    try {
        const productAll = await sequelizeProduct.findAll({
            attributes: ['id', 'name', 'price']
        })

        res.json({
            message: productAll
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

exports.products_create = async (req, res, next) => {
    console.log("products_create", req.body);

    try {
        const { name, price } = req.body;

        const newProduct = await sequelizeProduct.create({
            name,
            price
        })

        res.json({
            data: "New Product created successfully",
            newProduct
        })


        // if (role == "admin") {
        //     const newProduct = await sequelizeProduct.create({
        //         name,
        //         price
        //     })

        //     res.json({
        //         data: "New Product created successfully",
        //         //newProduct
        //     })
        // }
        // else {
        //     res.json({
        //         data: "You have no access to create product"
        //     })
        // }

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

exports.products_create_with_photo = async (req, res, next) => {

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
    console.log("product_id", req.body);

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

exports.products_update = async (req, res, next) => {
    console.log("products_updated", req.body);

    try {
        const { id, name, price } = req.body;

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


        // if (role == "admin") {
        //     await sequelizeProduct.update({
        //         name,
        //         price
        //     }, {
        //         where: {
        //             id
        //         }
        //     })

        //     res.json({
        //         message: "Updated successfully"
        //     })
        // }
        // else {

        // }

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

exports.products_delete = async (req, res, next) => {
    console.log("products_deleted", req.body);

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