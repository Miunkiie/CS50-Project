import axios from 'axios'

const API_URL = '/api/'

// Get new arrivals for homepage
const newArrivals = async (newArrivals) => {
    const response = await axios.get(API_URL, newArrivals)

    return response.data
}

// Get products
const getProducts = async (filters) => {
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


const productService = {
    newArrivals,
    getProducts
}

export default productService