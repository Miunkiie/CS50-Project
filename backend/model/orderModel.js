const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true, default: 1, min: 1},
        price: {type: Number, required: true},
        discount: {type: Number, required: true, default: 0},
        images: {type: String, required: true},
        _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
    }],
    shippingAddress: {
        country: {type: String, required: true},
        address: {type: String, required: true},
        address2: String,
        city: {type: String, required: true},
        state: {type: String, required: true},
        postalCode: String
    },
    billingAddress: {
        country: {type: String, required: true},
        address: {type: String, required: true},
        address2: String,
        city: {type: String, required: true},
        state: {type: String, required: true},
        postalCode: String
    },
    subTotal: {type: Number, required: true},
    shippingCost: {type: Number, required: true},
    total: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    paymentStatus: {type: String, required: true},
    orderStatus: {type: String, required: true},
    trackingId: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)