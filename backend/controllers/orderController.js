const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const mongoose = require('mongoose')


// @desc Checkout
// @Route POST /api/order/guest-checkout
// @access Public
const guestCheckout = asyncHandler(async(req, res) => {
    // Retrieve user cart
    const cart = await Cart.findOne(req.sessionID)
})


// @desc Retrieve order history
// @Route GET /api/order/history
// @access Private
const orderHistory = asyncHandler(async(req, res) => {
    res.json("Order History")
})


// @desc Checkout
// @Route POST /api/order/checkout
// @access Private
const userCheckout = asyncHandler(async(req, res) => {
    res.json("User checkout")
})


module.exports = {
    guestCheckout,
    orderHistory,
    userCheckout
}


