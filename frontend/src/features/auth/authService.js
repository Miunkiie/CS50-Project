// HTTP requests to our user endpoint
import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData, {withCredentials: true})

    return response.data
}


const authService = {
    register,
    login
}

export default authService
