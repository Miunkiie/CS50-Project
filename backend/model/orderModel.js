const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true, default: 1, min: 1},
        price: {type: Number, required: true},
        discount: {type: Number, required: true, default: 0},
        image: {type: String, required: true},
        productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
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
    subTotal: {Number, required: true},
    shippingCost: {Number, required: true},
    total: {Number, required: true},
    paymentMethod: {String, required: true},
    paymentStatus: {String, required: true},
    orderStatus: {String, required: true},
    trackingId: {String}
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)