const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxLength: 200
    },
    // References the comment with the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'User'
    }
})


const productSchema = mongoose.Schema({
    // References the user from the User collection - Used to check who created the product within the database
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    images: [String],

    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    colors: [{
        type: String,
        required: true
    }],
    
    // embeds the review schema 
    reviews: [reviewSchema],
        
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5,
    },
    numOfReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    stockCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})


module.exports = mongoose.model("Product", productSchema)