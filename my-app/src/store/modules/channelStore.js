import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: 'channel',
    initialState: {
      list: []
    },
    reducers: {
        setChannel(state, action) {
            state.list = action.payload
        }
    }
})
const { setChannel } = channelStore.actions

const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios('http://localhost:3004/list')
        dispatch(setChannel(res.data))
    }
}

const reducer = channelStore.reducer
export {
    fetchChannelList
}
export default reducer
