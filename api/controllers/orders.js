const db = require('../config/db')
const { QueryTypes } = require('sequelize')

const sequelizeOrder = require('../sequelize-models/Order')
const sequelizeUserOrderMapping = require('../sequelize-models/UserOrderMapping')

exports.orders_get_all = async (req, res, next) => {
    console.log("orders_get", req.body);

    console.log("one", req.user.id);

    //const current_user_id = req.user.id

    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: req.user.id,
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
        // if (userOrders) {
        //     console.log("two")
        //     const order = await sequelizeOrder.findAll({
        //         attributes: ['product_id', 'quantity'],
        //         where: {
        //             id: userOrders
        //         }
        //     })

        console.log(req.user.id)
        if (userOrders) {
            const order = await db.query(
                `SELECT
                o.product_id,
                o.quantity,
                p.price,
                (p.price * o.quantity) AS total_price
                FROM
                    shezan.products p,
                    shezan.orders o,
                    shezan.user_order_mapping uom
                WHERE
                    p.id = o.product_id
                    AND o.id = uom.order_id
                    AND uom.user_id = ${req.user.id};`
                , {
                    type: QueryTypes.SELECT
                })

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
            // const { id } = req.params;
            // const order = await sequelizeOrder.findOne({
            //     attributes: ['product_id', 'quantity'],
            //     where: {
            //         id
            //     }
            // })

            const { id } = req.params;

            const order = await db.query(
                `SELECT
                o.product_id,
                o.quantity,
                p.price,
                (p.price * o.quantity) AS total_price
                FROM
                    shezan.products p,
                    shezan.orders o
                WHERE
                    p.id = o.product_id
                    AND o.id = ${id};`
                , {
                    type: QueryTypes.SELECT
                })

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
};

exports.orders_create_order = async (req, res, next) => {

    console.log("orders_create", req.body);
    // console.log("two", req.user);
    console.log("three", req.user.id);

    const user_id = req.user.id

    try {
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
        } catch (error) {
            console.log(error)
            res.status(505).json({
                error: "Sorry, order creation failed!"
            })
        }
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
            res.json({
                message: "Order deleted successfully"
            })

        } else {
            // console.log("three")
            return res.status(404).send({ message: "Order is not found for deleting" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};