import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bankListData: [],
    bankListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: '',
    listbankItem: '',
    itemId: 0,
    modalAddBank: false,
    modalEditBank: false,
    bankById: null
}

const bankListSlice = createSlice({
    name: "bankList",
    initialState,
    reducers: {
        getBankListRequest: () => { },
        getBankListSuccess: (state, action) => {
            state.bankListData = action.payload.data.content
            state.bankListDataPaging = action.payload.data
        },
        getBankListFail: () => { },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        addBankRequest: () => { },
        addBankSuccess: (state, action) => {
            state.bankListData = action.payload.data.content
            state.bankListDataPaging = action.payload.data
        },
        addBankFail: () => { },
        editBankRequest: () => { },
        editBankSuccess: (state, action) => {
            state.bankListData = action.payload.data.content
            state.bankListDataPaging = action.payload.data
        },
        editBankFail: () => { },
        openModalAddBank: (state, action) => {
            state.modalAddBank = true
        },
        closeModalAddBank: (state, action) => {
            state.modalAddBank = false
        },
        openModalEditBank: (state, action) => {
            state.modalEditBank = true
            state.itemId = action.payload
        },
        closeModalEditBank: (state, action) => {
            state.modalEditBank = false
        },
        deleteBankRequest: () => { },
        deleteBankSuccess: (state, action) => {
            state.bankListData = action.payload.data.content
            state.bankListDataPaging = action.payload.data
        },
        deleteBankFail: () => { },
        getBankByIdRequest: () => { },
        getBankByIdSuccess: (state, action) => {
            state.bankById = action.payload.data
        },
        getBankByIdFail: () => { },
    }
})

export const {
    getBankListFail,
    getBankListRequest,
    getBankListSuccess,
    changePageNum,
    changeSearch,
    addBankFail,
    openModalAddBank,
    closeModalAddBank,
    addBankRequest,
    addBankSuccess,
    deleteBankFail, 
    deleteBankRequest, 
    deleteBankSuccess, 
    editBankFail,
    editBankRequest,
    editBankSuccess,
    closeModalEditBank,
    openModalEditBank,
    getBankByIdFail,
    getBankByIdRequest,
    getBankByIdSuccess
} = bankListSlice.actions

const bankListReducer = bankListSlice.reducer

export default bankListReducer