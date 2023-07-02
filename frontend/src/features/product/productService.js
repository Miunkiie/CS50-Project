import axios from 'axios'

const API_URL = '/api/'

// Get new arrivals for homepage
const newArrivals = async (newArrivals) => {
    const response = await axios.get(API_URL, newArrivals)

    return response.data
}

// Get the collection of products
const getCollections = async (filters) => {
    const {gender, category, sort, q, colors, sizes} = filters
    let response;

    if (category) {
        response = await axios.get(API_URL + `collections/${gender}/${category}`, {
            params: { sort }
        })
    } else {
        response = await axios.get(API_URL + `collections/${gender}`, {
            params: { sort }
        })
    }

    if (q) {
        response = await axios.get(API_URL + `collections/search`, {
            params: { q, sort, colors, sizes }
        })
    }

    return response.data
}

// Get product 
const getProduct = async (id) => {
    const response = await axios.get(API_URL + `product/${id}`)

    return response.data
}


const productService = {
    newArrivals,
    getCollections,
    getProduct
}

export default productService