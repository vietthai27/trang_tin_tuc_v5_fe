import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listLatestNews: []
}

const latestNewsSlice = createSlice({
    name: 'latestNews',
    initialState,
    reducers: {
        getListLatestNewsRequest: () => { },
        getListLatestNewsSuccess: (state, action) => { state.listLatestNews = action.payload },
        getListLatestNewsFail: () => { }
    }
})

const latestNewsReducer = latestNewsSlice.reducer

export const {
    getListLatestNewsFail,
    getListLatestNewsRequest,
    getListLatestNewsSuccess
} = latestNewsSlice.actions

export default latestNewsReducer