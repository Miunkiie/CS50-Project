const asyncHandler = require('express-async-handler')
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')
const mongoose = require('mongoose')


// @desc Retrieves the cart
// @Route GET /api/cart
// @access Public
const getCart = asyncHandler(async(req, res) => {
    const id = req.sessionID
    let cart;

    // If the user's logged in, we will retrieve the cart via it's ID
    if (req.session.isUser) {
        cart = await Cart.findById(req.session.cart)
    } else {
        cart = await Cart.findOne({id})
    }

    if (!cart) {
        res.status(404)
        throw new Error("Could not find cart")
    }

    // Sends the cart if there it contains an item
    if (cart && cart.products.length > 0) {
        res.status(200).json(cart)
    } else {
        res.status(200).json({message: "Cart is empty"})
    }
})


// @desc Add item to cart
// @Route POST /api/cart
// @access Public
const addItem = asyncHandler(async(req, res) => {
    const id = req.sessionID
    const {quantity, productId} = req.body
    let cart;

    if (req.session.isUser) {
        cart = await Cart.findById(req.session.cart)
    } else {
        cart = await Cart.findOne({id})
    }

    // Validates the product being added to the cart
    const product = await Product.findById(productId)

    if (!product) {
        res.status(404)
        throw new Error("Could find product you were looking for")
    }

    // Create a new cart if none can be found
    if (!cart) {
        const newCart = await Cart.create({
            sessionId: id,
            products: [{...product, quantity: quantity}],
            total: product.price * quantity
        })
        res.status(201).json(newCart)

    } else {
        // Searches the cart for the product via the product's id
        const item = cart.products.findIndex((item) => item._id == productId) 

        // checks if the cart already contains the item 
        if (item != -1) {
            // Add the quantity of the item being added to the cart
            const product = cart.products[item]
            product.quantity += Number(quantity)

            // Update the total cost of the cart
            cart.total = cart.products.reduce((acc, products) => acc + products.quantity * products.price, 0)
            
            // Update the product in the cart
            cart.products[item] = product
            await cart.save()   

            res.status(200).json(cart)
        } else {

            // Add new product in cart
            cart.products.push(product)
            cart.total = cart.products.reduce((acc, products) => acc + products.quantity * products.price, 0)

            await cart.save()
            res.status(200).json(cart)
        }
    }
})


// @desc Delete item from cart
// @Route DELETE /api/cart
// @access Public
const deleteItem = asyncHandler(async(req, res) => {
    const id = req.sessionID
    const {quantity, productId} = req.body
    let cart;
    
    if (req.session.isUser) {
        cart = await Cart.findById(req.session.cart)
    } else {
        cart = await Cart.findOne({id})
    }
    
    if (!cart) {
        res.status(404)
        throw new Error("Could not retrieve cart")
    }

    const item = cart.products.findIndex((item) => item._id == productId)
    if (item != -1) {
        // Retrieves the item and reduces the product quantity within the cart
        const product = cart.products[item]
        product.quantity -= Number(quantity)

        if (product.quantity <= 0) {
            cart.products.splice(item, 1)
        }

        cart.total = cart.products.reduce((acc, product) => acc + product.quantity * product.price, 0)

        await cart.save()
        res.status(200).json(cart)
    } else {
        res.status(404)
        throw new Error("Item not found in cart")
    }
})


module.exports = {
    getCart,
    addItem,
    deleteItem
}