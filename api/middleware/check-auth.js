const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        // const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(req.body);

        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}