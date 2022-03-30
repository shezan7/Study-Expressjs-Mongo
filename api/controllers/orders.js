const sequelizeOrder = require('../sequelize-models/Order')
const sequelizeUserOrderMapping = require('../sequelize-models/UserOrderMapping')

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
    console.log("two", req.user);
    console.log("three", req.user.id);

    const user_id = req.user.id

    try {
        const { product_id, quantity } = req.body;

        const newOrder = await sequelizeOrder.create({
            product_id,
            quantity
        })
        console.log(newOrder)
        const newOrderId = newOrder.id
        console.log("newOrderID", newOrder.id)


        const orderItem = await sequelizeUserOrderMapping.create({
            user_id,
            order_id: newOrderId
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