const asyncHandler = require("express-async-handler")

// @desc Get all the products
// @Route GET /api/products
// @access Public
const getProducts = asyncHandler (async (req, res) => {
    res.json({message: "Got all products"})
})

// @desc Get a single product
// @Route GET /api/products/:id
// @access Public
const getProductById  = asyncHandler (async (req, res) => {
    res.json({message: "Got all products"})
})