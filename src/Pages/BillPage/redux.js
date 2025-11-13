import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listUser: [],
    splitBillResult: {}
}

const billListSlice = createSlice({
    name: "billList",
    initialState,
    reducers: {
        getUserListRequest: () => { },
        getUserListSuccess: (state, action) => {
            state.listUser = action.payload.data.content
        },
        getUserListFail: () => { },
        splitBillRequest: () => { },
        splitBillSuccess: (state, action) => {
            state.splitBillResult = action.payload
        },
        splitBillFail: () => { },
    }
})

export const {
    getUserListFail,
    getUserListRequest,
    getUserListSuccess,
    splitBillFail,
    splitBillRequest,
    splitBillSuccess
} = billListSlice.actions

const billListReducer = billListSlice.reducer

export default billListReducer