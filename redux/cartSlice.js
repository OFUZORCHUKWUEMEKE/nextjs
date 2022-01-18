import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        product:[],
        total:0,
        quantity:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.product.push(action.payload)
            state.quantity  +=1
            state.total+=action.payload.price * action.payload.quantity
        },
        reset:(state)=>{
            state.product =[]
            state.total = 0 
            state.quantity = 0
        }
    }
})

export const {addProduct,reset} = cartSlice.actions;

export default cartSlice.reducer