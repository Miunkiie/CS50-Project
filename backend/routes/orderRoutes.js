const express = require ('express')
const router = express.Router()
const {guestCheckout, orderHistory, userCheckout} = require('../controllers/orderController')
const {protect} = require('../middleware/AuthMiddleware')

router.route('/guest-checkout').post(guestCheckout)
router.route('/history').get(protect, orderHistory)
router.route('/checkout').post(protect, userCheckout)

module.exports = router