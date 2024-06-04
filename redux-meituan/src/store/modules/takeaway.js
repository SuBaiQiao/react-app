import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const takeaway = createSlice({
    name: 'takeaway',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload;
        },
        setActiveIndex(state, action) {
            state.activeIndex = action.payload;
        },
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++;
            } else {
                const cart = JSON.parse(JSON.stringify(action.payload))
                cart.count = 1;
                state.cartList.push(cart)
            }
        },
        increCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++;
        },
        decreCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count--;
            if (item.count === 0) {
                state.cartList = state.cartList.filter(e => e.id !== action.payload.id)
            }
        },
        clearCart(state) {
            state.cartList = []
        }
    }
})

const {
    setFoodsList,
    setActiveIndex,
    addCart,
    increCount,
    decreCount,
    clearCart
} = takeaway.actions
const fetchGetFoodsList = (dispatch) => {
    axios('http://localhost:3004/takeaway').then(res => {
        dispatch(setFoodsList(res.data))
    })
}

const reducer = takeaway.reducer
export {
    fetchGetFoodsList,
    setActiveIndex,
    addCart,
    increCount,
    decreCount,
    clearCart
}
export default reducer
