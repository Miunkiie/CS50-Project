const asyncHandler = require('express-async-handler')
const Cart = require('../model/cartModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const mongoose = require('mongoose')


// @desc Retrieves the cart
// @Route GET /api/cart
// @access Public
const getCart = asyncHandler(async(req, res) => {
    let cart;

    // If the user's logged in, we will retrieve the cart via it's ID
    if (req.session.user) {
        cart = await Cart.findOne(req.session.user)
    } else {
        cart = req.session.cart
    }
    
    if (!cart) {
        res.status(404)
        throw new Error("No cart found")
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
    const {quantity, productId} = req.body
    let cart;

    // If user is logged in, retrieves the saved cart from the server, otherwise from the session
    if (req.session.user) {
        cart = await Cart.findOne(req.session.user)
    } else {
        cart = req.session.cart
    }

    // Validates the product being added to the cart
    const product = await Product.findById(productId)

    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }

    // Template for adding new items to the cart
    const newProduct = {
        name: product.name,
        quantity: Number(quantity),
        price: product.price,
        discount: product.discount,
        images: product.images[0],
        _id: productId
    }

    // Create a new cart if none can be found
    if (!cart) {
        if (req.session.user) {
            const newCart = await Cart.create({
                user: req.session.user,
                products: [{...product, quantity: Number(quantity), images: product.images[0]}],
                total: product.price * quantity
            })
            res.status(201).json(newCart)
        } else {
            
            req.session.cart = {
                products: [newProduct],
                total: product.price * quantity
            }
            res.status(201).json(req.session.cart)
        }

    } else {
        // Searches the cart for the product via the product's id, returns -1 if no item match
        const item = cart.products.findIndex((item) => item._id == productId) 

        // If item is already in cart 
        if (item != -1) {
            // Add the quantity of the item being added to the cart
            const product = cart.products[item]
            product.quantity += Number(quantity)

            // Update the total cost of the cart
            cart.total = cart.products.reduce((acc, products) => acc + products.quantity * products.price, 0)
            
            // Updates the cart within the database
            cart.products[item] = product
            
            if (req.session.user) {
                await cart.save()   
            } else {
                req.session.save()
            }

            res.status(200).json(cart)
        } else {

            // Add new product in cart
            if (req.session.user) {

                cart.products.push(newProduct)
                cart.total = cart.products.reduce((acc, products) => acc + products.quantity * products.price, 0)
                
                await cart.save()
            } else {
                cart.products.push(newProduct)
                cart.total = cart.products.reduce((acc, products) => acc + products.quantity * products.price, 0)
                req.session.save()
            }
            res.status(200).json(cart)
        }
    }
})


// @desc Delete item from cart
// @Route DELETE /api/cart
// @access Public
const deleteItem = asyncHandler(async(req, res) => {
    const {quantity, productId} = req.body
    let cart;
    
    if (req.session.user) {
        cart = await Cart.findOne(req.session.user)
    } else {
        cart = req.session.cart
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

        if (req.session.user) {
            await cart.save()
        } else {
            req.session.save()
        }
        
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