const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add username"],
    },
    email: {
        type: String,
        required: [true, "Please add email"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    sessionId: {
        type: String,
        required: true,
    },
}, {timestamps: true})

// Static to hash the user's password
userSchema.statics.encryptPw = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


// Method to authenticate user's password
userSchema.methods.verifyPw = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// Generate JWT
userSchema.statics.generateToken = (id) => {
    // Signs the user id passed in with the secret from the env 
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = mongoose.model('User', userSchema)