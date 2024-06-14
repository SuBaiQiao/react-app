// 账单列表相关store

import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const billList = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
        save(state, action) {
            state.billList = [...state.billList, action.payload];
        }
    }
})

const {setBillList, save} = billList.actions

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/ka")
        dispatch(setBillList(res.data))
    }
}

const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post("http://localhost:3004/ka", data)
        dispatch(save(res.data))
    }
}

const reducer = billList.reducer

export {
    getBillList,
    addBillList
}
export default reducer
