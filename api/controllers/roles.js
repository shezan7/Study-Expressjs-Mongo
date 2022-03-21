const sequelizeRole = require('../sequelize-models/Role')

exports.roles_create = async (req, res, next) => {
    console.log("roles_create", req.body);

    console.log(req.role)
    try {
        const { name, accesslist } = req.body;

        const newRole = await sequelizeRole.create({
            name,
            accesslist
        })

        res.json({
            data: "New Role assigned successfully",
            newRole
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}