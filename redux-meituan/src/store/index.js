import {configureStore} from "@reduxjs/toolkit";
import takeawayReducer from "./modules/takeaway";

const store = configureStore({
    reducer: {
        takeaway: takeawayReducer
    }
})

export default store
