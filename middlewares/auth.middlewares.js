const JWT = require("jsonwebtoken")
const config = require("../config/config")

exports.auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            error : "Not authorized to access this route 1"
        })
    }
    try {
        const decode = JWT.verify(token, config.JWT_SECRET)
        req.user = decode
        return next()
    } catch (error) {
        return res.status(401).json({
            error : "Not authorized to access this routec 2"
        })
    }
}