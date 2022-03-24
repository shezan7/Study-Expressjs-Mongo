const sequelizeOrder = require('../sequelize-models/Order')

exports.orders_get_all = async (req, res, next) => {
    console.log("orders", req.body);

    try {
        const orderAll = await sequelizeOrder.findAll({

            attributes: ['id', 'product', 'quantity']

        })

        res.json({
            message: orderAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.orders_get_order = async (req, res, next) => {
    console.log("order_id", req.params);

    try {
        const { id } = req.params;
        const orderId = await sequelizeOrder.findAll({
            attributes: ['id', 'product', 'quantity'],
            where: {
                id
            }
        })

        res.json({
            message: "orderId find successfully", orderId
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.orders_create_order = async (req, res, next) => {

    console.log("orders_create", req.body);

    try {
        const { product, quantity } = req.body;
        const newOrder = await sequelizeOrder.create({
            product,
            quantity
        })

        res.json({
            data: "New Order created successfully"
            //newOrder
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

};

exports.orders_delete_order = async (req, res, next) => {
    console.log("orders_deleted", req.body);

    try {
        const { id } = req.body;
        const order = await sequelizeOrder.destroy({
            where: {
                id
            }
        })
        if (!order) {
            return res.status(404).send({ message: "Order is not found for deleting" });
        }
        res.json({
            message: "Order deleted successfully"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};