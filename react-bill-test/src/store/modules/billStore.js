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
            let bill = action.payload;
            bill.id = uuidv4();
            state.billList = [...state.billList, bill];
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

const reducer = billList.reducer

export {
    getBillList,
    save
}
export default reducer
