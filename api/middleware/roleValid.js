const jwt = require("jsonwebtoken")

exports.authAdmin = (...roles) => {
    // console.log(roles)

    return roleValid = (req, res, next) => {
        const authHeader = req.get("Authorization");
        const token = authHeader.split(" ")[1]

        const decodedToken = jwt.decode(token);
        if (roles.includes(decodedToken.role)) {
            res.user = decodedToken
            return next()
        } else {
            res.status(401).json({
                status: "fail",
                message: "Unauthorized! You have no access"
            })
        }
    }
}