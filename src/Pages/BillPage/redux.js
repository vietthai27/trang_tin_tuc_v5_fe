// File: redux.js

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listUser: [],
    splitBillResult: {},
    accountListDataByUser: {}, // Stores { 'ReceiverName': [account1, account2, ...], ... }
    selectUser:'',
    listUserBill:[]
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
        changeSelectUser: (state, action) => {
            state.selectUser = action.payload
        },
        changeListUserBill: (state, action) => {
            
            state.listUserBill.push(action.payload);
        },
        // 💡 NEW REDUCERS FOR ACCOUNT LIST MANAGEMENT
        getAccountListSuccess: (state, action) => {
            // Payload should be { receiver: 'Username', data: [...] }
            const { receiver, data } = action.payload;
            state.accountListDataByUser[receiver] = data; // Store data keyed by receiver
        },
        getAccountListFail: () => { },
    }
})

export const {
    getUserListFail,
    getUserListRequest,
    getUserListSuccess,
    splitBillFail,
    splitBillRequest,
    splitBillSuccess,
    changeSelectUser,
    changeListUserBill,
    // 💡 EXPORT NEW ACTIONS
    getAccountListSuccess,
    getAccountListFail,
} = billListSlice.actions

const billListReducer = billListSlice.reducer

export default billListReducer