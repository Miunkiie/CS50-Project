const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    products: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true, default: 1, min: 1},
        price: {type: Number, required: true},
        discount: {type: Number, required: true, default: 0},
        images: [{type: String, required: true}],
        _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
    }],
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Cart', cartSchema)