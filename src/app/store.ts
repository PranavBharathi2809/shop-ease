import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "../features/auth/Authslice";
import productReducer from "../features/product/ProductSlice"
import orderReducer from "../features/order/orderSlice";
import cartReducer from  "../features/Cart/cartSlice";
import paymentReducer from "../features/Payment/paymentSlice";
//sets up the central redux store 
//Registering authslice inside configurestore from redux
export const store = configureStore({
    reducer:{
        auth:authReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        payment: paymentReducer,
    }
})
//Data flow for storing in global store
//dispatch action (with |without payload) ==> reducer ==>store
//for data retreiveal - drectly from store using the key in the reducer


//provides strong types for root state
export type RootState = ReturnType<typeof store.getState>

//For dispatch type - type of action and payload
export type AppDispatch = typeof store.dispatch
