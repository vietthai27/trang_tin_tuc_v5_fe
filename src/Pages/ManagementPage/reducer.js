import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    pageNum: 0,
    pageSize: 10,
    managementList: [],
    roleList: [],
    modalAdd: false,
    modalEdit: false,
    managementById: {}
}

const managementPageSlice = createSlice({
    name: 'managementPage',
    initialState,
    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        changePageSize: (state, action) => {
            state.pageSize = action.payload
        },
        getManagementListRequest: () => { },
        getManagementListSuccess: (state, action) => {
            state.managementList = action.payload
        },
        getManagementListFail: () => { },
        getRoleListRequest: () => { },
        getRoleListSuccess: (state, action) => {
            state.roleList = action.payload
        },
        getRoleListFail: () => { },
        addManagementRequest: () => { },
        addManagementSuccess: () => { },
        addManagementFail: () => { },
        editManagementRequest: () => { },
        editManagementSuccess: () => { },
        editManagementFail: () => { },
        getIdManagementRequest: () => { },
        getIdManagementSuccess: (state, action) => { state.managementById = action.payload },
        getIdManagementFail: () => { },
        openModalAdd: (state) => { state.modalAdd = true },
        closeModalAdd: (state) => { state.modalAdd = false },
        openModalEdit: (state) => { state.modalEdit = true },
        closeModalEdit: (state) => { state.modalEdit = false },
        deleteManagementRequest: () => { },
        deleteManagementSuccess: () => { },
        deleteManagementFail: () => { },
    }
})

const managementPageReducer = managementPageSlice.reducer

export const {
    changePageNum,
    changePageSize,
    changeSearch,
    getManagementListRequest,
    getManagementListSuccess,
    getManagementListFail,
    getRoleListFail,
    getRoleListRequest,
    getRoleListSuccess,
    addManagementFail,
    addManagementRequest,
    addManagementSuccess,
    closeModalAdd,
    closeModalEdit,
    openModalAdd,
    openModalEdit,
    editManagementFail,
    editManagementRequest,
    editManagementSuccess,
    getIdManagementFail,
    getIdManagementRequest,
    getIdManagementSuccess,
    deleteManagementFail,
    deleteManagementRequest,
    deleteManagementSuccess
} = managementPageSlice.actions

export default managementPageReducer