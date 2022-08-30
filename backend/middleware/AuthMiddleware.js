const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// Protects routes by verifying the jwt attached to the request payload
const protect = asyncHandler (async (req , res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Retrieve the token
            token = req.headers.authorization.split(" ")[1]

            // Verify the token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Send back the user._id to endpoint so we can reference the user
            req.user = await User.findById(decoded.id).select('-password')

            next();
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    // If no token has been set
    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})


// Verifies admin right
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("No permission to access")
    }
}
module.exports = { protect, admin }