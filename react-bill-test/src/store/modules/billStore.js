// 账单列表相关store

import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const billList = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        }
    }
})

const {setBillList} = billList.actions

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/ka")
        dispatch(setBillList(res.data))
    }
}

const reducer = billList.reducer

export {
    getBillList
}
export default reducer