const asyncHandler = require("express-async-handler")
const Products = require('../model/productModel')
const mongoose = require('mongoose')

// @desc Retrieves the newsest arrivals - homepage for the website
// @Route GET /api/
// @access Public
const getHomepage = asyncHandler (async (req, res) => {
    // Retrieves the newest arrivals based on the time they were first created
    const newArrivals = await Products.find({}).sort('-createdAt').limit(10).exec()
    
    if (!newArrivals) {
        res.status(500)
        throw new Error("Unable to retrieve new Arrivals")
    }

    res.status(200).json(newArrivals)
})


// @desc Retrieve products based on the selected "filters" chosen by the user.
// @Route GET /api/collections/:gender
// @access Public
const getProducts = asyncHandler (async (req, res) => {
    const {colors, q, sort, sizes} = req.query
    const {gender, category} = req.params
    let sortItems;

    // Saves all the filtered options
    let filters = [{
        $match: {
            $and: [
                gender ? {gender: gender} : {},
                q ? {category: {
                    $regex: q,
                    $options: 'im'
                }} : {},
                colors ? {colors: {$in: colors}} : {},
                sizes ? {sizes: {$in: sizes}} : {},
                category ? {category: category} : {},
            ]
        },
    }]

    // Returns the products based on the sorting chosen
    if (sort){
        switch (sort) {
            case 'priceAsc':
                sortItems = {"price": 1}
                break;
            case 'priceDesc':
                sortItems = {"price": -1}
                break;
            case 'ratingAsc':
                sortItems = {"rating": 1}
                break;
            case 'ratingDesc':
                sortItems = {"rating": -1}
                break;
            default:
                sortItems = {}
        }
        const products = await Products.aggregate(filters).sort(sortItems).exec()

        if (!products){
            res.status(400)
            throw new Error("Failed to sort products")
        }
        return res.status(200).json(products)
    } 
    
    const products = await Products.aggregate(filters).exec()
    if (!products) {
        res.status(501)
        throw new Error("Issue with retrieving products")
    }

    res.status(200).json(products)
})


// @desc Rertrieves a single product
// @Route GET /api/collections/product/:id
// @access Public
const getProductById  = asyncHandler (async (req, res) => {
    const id = req.params.id

    const product = await Products.findById(id)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }

    res.status(200).json(product)

})


/*  Admin   */

// @desc Create a new product
// @Route POST /api/products
// @access Private/Admin
const createProduct  = asyncHandler (async (req, res) => {
    // Creates a template for a new product
    const product = new Products({
        name : 'Sample name',
        price : 0,
        category : [],
        description : 'Sample description',
        gender: ' ',
        sizes : [],
        colors:[],
        images : ['Upload images here'],
        countInStock :  0,
        numReviews : 0,
        // User that created the product
        user : req.user._id
    })
    const createProduct = await product.save();
    res.status(201).json(createProduct)
})


// @desc Update a product
// @Route PUT /api/products/:id
// @access Private/Admin
const updateProduct  = asyncHandler (async (req, res) => {
    const id = req.params.id
    console.log(req.url)

    // Validates the product id
    if (mongoose.isValidObjectId(id)) {
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {returnDocument: 'after'})

        if (!updatedProduct) {
            res.status(502)
            throw new Error("Could not update product")
        }
        res.status(200).json(updatedProduct)
 
    } else {
        res.status(404)
        throw new Error("Could not find product")
    }
})


// @desc Delete a product
// @Route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct  = asyncHandler (async (req, res) => {
    const productId = req.params.id

    try {
        const product = await Products.findByIdAndDelete(productId)
    } catch (err) {
        res.status(404)
        throw new Error("Could not find product")
    }

    res.status(200).json({message: "Product removed"})
    
})


// @desc Create a new review
// @Route POST /api/products/:id/reviews
// @access Private
const createReview  = asyncHandler (async (req, res) => {
    const {rating, comment} = req.body
    const productId = req.params.id

    // Find the product and checks if the user has already left a review on the product
    const product = await Products.findById(productId)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }

    const reviewed = product.reviews.find(currProduct => currProduct.user.toString() === req.user._id.toString()) 
    if (reviewed) {
        res.status(405)
        throw new Error("You have already reviewed this product")
    }
    
    // Add the review to the product
    product.reviews.push({
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
        user: req.user._id
    })
    
    // Update the average rating / numReviews of the product
    product.numOfReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numOfReviews

    await product.save()
    
    res.status(201).json({message: "Review created"})
})


module.exports = {
    getProducts,
    getHomepage,
    getProductById,
    createReview,
    createProduct,
    deleteProduct,
    updateProduct
}