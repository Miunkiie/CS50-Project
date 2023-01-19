const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// @desc Register new user
// @Route POST /api/users
// @access Public
const registerUser = asyncHandler (async (req, res) => {
    const { email, name, password, confirmPassword } = req.body
    const sessionId = req.sessionID
    
    // Checks if user has completed all fields
    if (!email || !name || !password || !confirmPassword) {
        res.status(400)
        throw new Error("Please complete all fields")
    }

    // Checks if email already exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("Email already exists")
    }

    // Checks if password and the confirmPassword matches
    if (password != confirmPassword) {
        res.status(400)
        throw new Error("Passwords do not match")
    }

    // Encrypt the password to store into database
    const hashedPw = await User.encryptPw(password)
    
    // Create user within the db
    const user = await User.create({
        email,
        name,
        password: hashedPw,
        sessionId: sessionId,
    })

    // If successful in creating user, send back jwt & user details
    if (user) {
        res.status(201).json("Registered user!")

    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc Login/Authenticate user
// @Route POST /api/users/login
// @access Public
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body

    // Make sure all fields are completed
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter email/password')
    }

    // Find the user within the db
    const user = await User.findOne({email}).setOptions({ sanitizeFilter: true })
    
    // Authenticates the user
    if (user && (await user.verifyPw(password))) {
        const token = await User.generateToken(user._id)
        req.session.token = token
        
        res.cookie('token', req.session.token).status(200).json({token})
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc Get user profile
// @Route GET /api/users/profile
// @access Private
const getOwnProfile = asyncHandler(async (req, res) => {
    // Get user display by finding their _id in the database. 
    const user = req.user

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc Update profile
// @Route PUT /api/users/profile
// @access Private
const updateOwnProfile = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPw } = req.body

    const user = await User.findById(req.user._id)

    // Checks if any of the fields have been completed
    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        
        if (password && password == confirmPw) {
            hashedPw = await User.encryptPw(password)
            user.password = hashedPw
        }

        // Updates the user details within the db. 
        const updatedDetails = await user.save();

        res.json({
            name: updatedDetails.name,
            email: updatedDetails.email,
            password: updatedDetails.password,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc logout profile
// @Route POST /api/users/profile
// @access Private
const logout = asyncHandler(async (req,res) => {
    // Clears the session, and the cookie from the client.
    if (req.session) {
        res.clearCookie('token')
        req.session.destroy((err) =>{
            if (err) {
                res.status(400)
                throw new Error('Unable to logout')
            } else {
                res.status(200).json("Logged out succesfully")
            }
        })
    } else {
        res.redirect('../login')
    }
})


/*          Admin privileges            */

// @desc Update user profiles
// @Route PUT /api/users/:id
// @access PrivateAdmin
const updateUserProfile = asyncHandler (async (req, res) => {
    const { name, email, password, confirmPw } = req.body
    // Find user with their id
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        
        if (password && password == confirmPw) {
            hashedPw = await User.encryptPw(password)
            user.password = hashedPw
        }

        // Updates the user details within the db. 
        const updatedDetails = await user.save();

        res.json({
            name: updatedDetails.name,
            email: updatedDetails.email,
            password: updatedDetails.password,
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc Delete user profiles
// @Route DELETE /api/users/:id
// @access PrivateAdmin
const deleteUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({message: "User removed"})

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc Get user profiles
// @Route GET /api/users/:id
// @access PrivateAdmin
const getUserProfile = asyncHandler (async (req, res) => {
    if (req.user) {
        res.json(req.user)

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc Get all user profiles
// @Route GET /api/users
// @access PrivateAdmin
const getAllProfile = asyncHandler (async (req, res) => {
    const allUsers = await User.find({})

    res.json(allUsers)
})


module.exports = {
    registerUser,
    loginUser,
    getOwnProfile,
    updateOwnProfile,
    logout,
    updateUserProfile,
    deleteUserProfile,
    getUserProfile,
    getAllProfile,
}