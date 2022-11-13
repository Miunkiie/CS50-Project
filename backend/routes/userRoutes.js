const express = require('express')
const { registerUser, loginUser, getOwnProfile, updateOwnProfile, updateUserProfile, deleteUserProfile, getUserProfile, getAllProfile, logout } = require('../controllers/userController')
const { protect, admin } = require('../middleware/AuthMiddleware')
const router = express.Router()


router.route('/').post(registerUser).get(protect,getAllProfile)
router.route('/login').post(loginUser)
router.route('/profile').get(protect, getOwnProfile).put(protect, updateOwnProfile).delete(protect, logout)

/* Admin privileges */

router.route('/:id').put(protect, admin, updateUserProfile).delete(protect, admin, deleteUserProfile).get(protect, admin, getUserProfile)


module.exports = router  