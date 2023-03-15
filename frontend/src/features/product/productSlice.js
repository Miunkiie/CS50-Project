import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Newest arrivals for homepage
export const newArrivals = createAsyncThunk('product/newArrivals', async (newArrivals, thunkAPI) => {
    try {
        const product = await productService.newArrivals({})
        return product.map(item => ({
            id: item._id,
            description: item.description,
            image: item.images[0]
        }))

    } catch(error) {
        const message = (error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Retrieve products
export const getProducts = createAsyncThunk('product/getProducts', async (filters, thunkAPI) => {
    try {
        const products = await productService.getProducts(filters)
        return products.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            rating: item.rating,
            image: item.images[0]
        }))

    } catch (error) {
        const message = (error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(newArrivals.pending, state => {
            state.isLoading = true
        })
        .addCase(newArrivals.fulfilled, (state, action) => {
            state.isLoading = false
            state.product = action.payload

        })
        .addCase(newArrivals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.product = null
        })
                    .addCase(getProducts.pending, state => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.product = action.payload

        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.product = null
        })

    }

})


export default productSlice.reducer