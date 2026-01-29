import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsDetail: {}
}

const newsDetailSlice = createSlice({
    name: 'newsDetail',
    initialState,
    reducers: {
        getNewsDetailRequest: () => { },
        getNewsDetailSuccess: (state, action) => { state.newsDetail = action.payload },
        getNewsDetailFail: () => { }
    }
})

const newsDetailReducer = newsDetailSlice.reducer

export const {
    getNewsDetailFail,
    getNewsDetailRequest,
    getNewsDetailSuccess
} = newsDetailSlice.actions

export default newsDetailReducer