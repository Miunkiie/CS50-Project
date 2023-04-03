const express = require('express')
const { protect, admin } = require('../middleware/AuthMiddleware')
const { getProducts, getHomepage, getProductById, createReview, createProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const router = express.Router()

router.route('/').get(getHomepage)
router.route('/products').post(protect, admin, createProduct)
router.route('/products/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/products/:id/reviews').post(protect, createReview)
router.route('/collections/search').get(getProducts)
router.route('/collections/:gender/:category?').get(getProducts)


module.exports = router

