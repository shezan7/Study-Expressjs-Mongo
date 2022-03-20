const jwt = require("jsonwebtoken")

exports.authAdmin = (roles) => {
    // console.log(roles)

    return roleValid = (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next()
        } else {
            res.status(401).json({
                status: "Failed",
                message: "Unauthorized! You have no access"
            })
        }
    }
}