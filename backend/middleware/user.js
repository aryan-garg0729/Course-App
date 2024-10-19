const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config.js')
const authmiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        if (decodedValue.email) {
            req.body.email=decodedValue.email
            req.body.role=decodedValue.role
            next();
        } else {
            res.status(403).json({
                message: "Please Login"
            })
        }
    } catch(e) {
        res.status(403).json({
            message: "Please Login"
        })
    }

}

module.exports = authmiddleware;