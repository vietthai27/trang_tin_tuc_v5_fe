import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accountListData: [],
    itemId: 0,
    modalAddAccount: false,
    modalEditAccount: false,
    listBanks: [],
    accountById: {},
    bankIdEdit: 0
}

const accountListSlice = createSlice({
    name: "accountList",
    initialState,
    reducers: {
        getAccountListRequest: () => { },
        getAccountListSuccess: (state, action) => {
            state.accountListData = action.payload
        },
        getAccountListFail: () => { },
        addAccountRequest: () => { },
        addAccountSuccess: (state, action) => {
            state.accountListData = action.payload.data
        },
        addAccountFail: () => { },
        openModalAddAccount: (state, action) => {
            state.modalAddAccount = true
        },
        closeModalAddAccount: (state, action) => {
            state.modalAddAccount = false
        },
        getBankListRequest: () => { },
        getBankListSuccess: (state, action) => {
            state.listBanks = action.payload
        },
        getBankListFail: () => { },
        deleteAccountRequest: () => { },
        deleteAccountSuccess: (state, action) => {
            state.accountListData = action.payload.data
        },
        deleteAccountFail: () => { },
        getAccountByIdRequest: () => { },
        getAccountByIdSuccess: (state, action) => {
            state.accountById = action.payload.data
        },
        getAccountByIdFail: () => { },
        editAccountRequest: () => { },
        editAccountSuccess: (state, action) => {
            state.accountListData = action.payload.data
        },
        editAccountFail: () => { },
        openModalEditAccount: (state, action) => {
            state.modalEditAccount = true
            state.itemId = action.payload.id
            state.bankIdEdit = action.payload.bankId
        },
        closeModalEditAccount: (state, action) => {
            state.modalEditAccount = false
        },
    }
})

export const {
    addAccountFail,
    addAccountRequest,
    addAccountSuccess,
    closeModalAddAccount,
    getAccountListFail,
    getAccountListRequest,
    getAccountListSuccess,
    openModalAddAccount,
    getBankListFail,
    getBankListRequest,
    getBankListSuccess,
    deleteAccountFail,
    deleteAccountRequest,
    deleteAccountSuccess,
    closeModalEditAccount,
    editAccountFail,
    editAccountRequest,
    editAccountSuccess,
    getAccountByIdFail,
    getAccountByIdRequest,
    getAccountByIdSuccess,
    openModalEditAccount,
} = accountListSlice.actions

const accountListReducer = accountListSlice.reducer

export default accountListReducer