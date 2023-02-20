import axios from 'axios'

const API_URL = '/api/'

// Get new arrivals for homepage
const newArrivals = async (newArrivals) => {
    const response = await axios.get(API_URL, newArrivals)

    return response.data
}

const productService = {
    newArrivals,
}

export default productService