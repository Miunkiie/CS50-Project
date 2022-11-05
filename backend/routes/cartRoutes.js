const express = require('express')
const router = express.Router()
const {getCart, addItem, deleteItem} = require('../controllers/cartController')


router.route('/').get(getCart).post(addItem).delete(deleteItem)

module.exports = router