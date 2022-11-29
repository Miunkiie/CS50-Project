const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const User = require('../model/userModel')
const mongoose = require('mongoose')
const ShortUniqueId = require('short-unique-id')
const {sendEmail} = require('../middleware/EmailMiddleware')

// @desc Checkout
// @Route POST /api/order/guest-checkout
// @access Public
const guestCheckout = asyncHandler(async(req, res) => {
    const payload = req.body

    // Retrieve cart from session
    const cart = req.session.cart

    if (!cart) {
        res.status(404)
        throw new Error("Cart not found")
    }

    if (!payload.shippingAddress || !payload.billingAddress) {
        res.status(400)
        throw new Error("Please enter your shipping/billing address")
    }

    if(!payload.email){
        res.status(400)
        throw new Error("Please enter your email address")
    }

    if (!payload.cardNo || !payload.cardExp || !payload.cvv){
        res.status(400)
        throw new Error("Please enter your card details")
    }

    // Assign tracking ID
    const trackingId = new ShortUniqueId({ length: 10 });
    
    // Send confirmation email of the purchase to the user
    const email = await sendEmail({
        email: payload.email,
        subject: "OzzieSales: confirmation email",
        text: `Thank you for your purhcase. Your order will be shipped soon.\n\nHere's your tracking id: ${trackingId()}`
    })
    
    res.status(200).json("Confirmation email has been sent")
})


// @desc Retrieve order history
// @Route GET /api/order/history
// @access Private
const orderHistory = asyncHandler(async(req, res) => {
    if (!req.user) {
        res.status(404)
        throw new Error("Could not find user")
    }

    const order = await Order.find(req.session.user)
    if (!order) {
        res.status(404)
        throw new Error("Could not find orders")
    }

    res.status(200).json(order)
})


// @desc Checkout
// @Route POST /api/order/checkout
// @access Private
const userCheckout = asyncHandler(async(req, res) => {
    const payload = req.body
    const cart = await Cart.findOne(req.user._id)

    // A series of validations
    if (!cart) {
        res.status(404)
        throw new Error("Could not find cart")
    }
    console.log(typeof(payload.shippingAddress))
    if (!payload.shippingAddress || !payload.billingAddress) {
        res.status(400)
        throw new Error("Please enter your shipping/billing address")
    }

    if(!payload.email){
        res.status(400)
        throw new Error("Please enter your email address")
    }

    if (!payload.cardNo || !payload.cardExp || !payload.cvv){
        res.status(400)
        throw new Error("Please enter your card details")
    }

    const newOrder = await Order.create({
        user: req.user._id,
        products: cart.products,
        shippingAddress: payload.shippingAddress,
        billingAddress: payload.billingAddress,
        subTotal: cart.total,
        shippingCost: payload.shippingCost,
        total: payload.shippingCost + cart.total,
        paymentMethod: "Card",
        paymentStatus: "Paid",
        orderStatus: "Shipped"        
    })

    console.log(cart)
    res.json(cart)


})


module.exports = {
    guestCheckout,
    orderHistory,
    userCheckout
}


