const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const mongoose = require('mongoose')
const ShortUniqueId = require('short-unique-id')
const {sendEmail} = require('../config/Nodemailer')


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
    const email = sendEmail({
        email: payload.email,
        subject: "OzzieSales: confirmation email",
        text: `Thank you for your purhcase. Your order will be shipped soon.\n\nHere's your tracking id: ${trackingId()}`,
        html: `<p>Thank you for your purhcase. Your order will be shipped soon.<br><br>
        Here's your tracking id: <a href=https://www.dhl.com/au-en/home/tracking/tracking-global-forwarding.html?submit=1&tracking-id=${trackingId()}> ${trackingId()}</a><br>
        It may take some time before you can track your shipment on the website.
        </p>`
    })

    // Delete cart once order has been completed
    req.session.cart = null;
    
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
    
    if (!newOrder) {
        res.status(400)
        throw new Error("Could not create order")
    }
    
    const trackingId = new ShortUniqueId({ length: 10 });
    
    // Send confirmation email of the purchase to the user
    const email = sendEmail({
        email: payload.email,
        subject: "OzzieSales: confirmation email",
        text: `Thank you for your purhcase. Your order will be shipped soon.\n\nHere's your tracking id: ${trackingId()}`,
        html: `<p>Thank you for your purhcase. Your order will be shipped soon.<br><br>
        Here's your tracking id: <a href=https://www.dhl.com/au-en/home/tracking/tracking-global-forwarding.html?submit=1&tracking-id=${trackingId()}> ${trackingId()}</a><br>
        It may take some time before you can track your shipment on the website.
        </p>`
    })
    
    // Remove cart
    cart.deleteOne()

    res.status(200).json("Confirmation email has been sent")
})


module.exports = {
    guestCheckout,
    orderHistory,
    userCheckout
}


