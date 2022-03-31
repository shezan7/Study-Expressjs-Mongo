const sequelizeOrder = require('../sequelize-models/Order')
const sequelizeUserOrderMapping = require('../sequelize-models/UserOrderMapping')

exports.orders_get_all = async (req, res, next) => {
    console.log("orders_get", req.body);

    // console.log("one", req.user.id);

    const current_user_id = req.user.id
    console.log(current_user_id)


    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: current_user_id,
        },
        attributes: ["order_id"]
    })
    // console.log("find", findUserId.user_order_mapping)
    findUserId.map((val) => {
        // console.log('Value', val.order_id);
        userOrders.push(val.order_id)
    })
    console.log("list", userOrders);

    // console.log("id", req.params.id)
    // console.log("type", typeof (req.params.id))
    // console.log("type", typeof parseInt(req.params.id))


    try {
        if (userOrders) {
            console.log("two")
            const order = await sequelizeOrder.findAll({
                attributes: ['product_id', 'quantity'],
                where: {
                    id: userOrders
                }
            })
            // if (!order) {
            //     return res.status(404).send({ message: "Order is not found for deleting" });
            // }
            res.json({
                message: "Find successfully", order
            })

        } else {
            console.log("three")
            return res.status(404).send({ message: "Not found!!!" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }



    // console.log("orders", req.body);

    // try {
    //     const orderAll = await sequelizeOrder.findAll({

    //         attributes: ['id', 'product_id', 'quantity']

    //     })

    //     res.json({
    //         message: orderAll
    //     })
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(500).json({
    //         error: err
    //     })
    // }
};

exports.orders_get_order = async (req, res, next) => {
    console.log("orders_get", req.body);

    // console.log("one", req.user.id);

    const current_user_id = req.user.id
    console.log(current_user_id)


    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: current_user_id,
        },
        attributes: ["order_id"]
    })
    // console.log("find", findUserId.user_order_mapping)
    findUserId.map((val) => {
        // console.log('Value', val.order_id);
        userOrders.push(val.order_id)
    })
    console.log("list", userOrders);

    // console.log("id", req.params.id)
    // console.log("type", typeof (req.params.id))
    // console.log("type", typeof parseInt(req.params.id))


    try {
        if (userOrders.includes(parseInt(req.params.id))) {
            console.log("two")
            const { id } = req.params;
            const order = await sequelizeOrder.findOne({
                attributes: ['product_id', 'quantity'],
                where: {
                    id
                }
            })
            // if (!order) {
            //     return res.status(404).send({ message: "Order is not found for deleting" });
            // }
            res.json({
                message: "Find successfully", order
            })

        } else {
            console.log("three")
            return res.status(404).send({ message: "Not found!!!" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }


    // console.log("order_id", req.params);

    // try {
    //     const { id } = req.params;
    //     const orderId = await sequelizeOrder.findOne({
    //         attributes: ['id', 'product_id', 'quantity'],
    //         where: {
    //             id
    //         }
    //     })

    //     res.json({
    //         message: "orderId find successfully", orderId
    //     })
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(500).json({
    //         error: err
    //     })
    // }
};

exports.orders_create_order = async (req, res, next) => {

    console.log("orders_create", req.body);
    // console.log("two", req.user);
    console.log("three", req.user.id);

    const user_id = req.user.id

    try {
        const { product_id, quantity } = req.body;

        const newOrder = await sequelizeOrder.create({
            product_id,
            quantity
        })
        // console.log(newOrder)
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

    // console.log("one", req.user.id);

    const current_user_id = req.user.id
    // console.log(current_user_id)


    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: current_user_id,
        },
        attributes: ["order_id"]
    })
    // console.log("find", findUserId.user_order_mapping)
    findUserId.map((val) => {
        console.log('Value', val.order_id);
        userOrders.push(val.order_id)
    })
    console.log("list", userOrders);


    try {
        if (userOrders.includes(req.body.id)) {
            // console.log("two")
            const { id } = req.body;
            const order = await sequelizeOrder.destroy({
                where: {
                    id
                }
            })
            // if (!order) {
            //     return res.status(404).send({ message: "Order is not found for deleting" });
            // }
            res.json({
                message: "Order deleted successfully"
            })

        } else {
            // console.log("three")
            return res.status(404).send({ message: "Order is not found for deleting" });
        }

        // const { id } = req.body;
        // const order = await sequelizeOrder.destroy({
        //     where: {
        //         id
        //     }
        // })
        // if (!order) {
        //     return res.status(404).send({ message: "Order is not found for deleting" });
        // }
        // res.json({
        //     message: "Order deleted successfully"
        // })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};