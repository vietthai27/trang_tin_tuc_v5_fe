import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    pageNum: 0,
    pageSize: 10,
    subCategoryList: [],
    modalAdd: false,
    modalEdit: false,
    subCategoryById: {},
    categoryName: ''
}

const subCategoryPageSlice = createSlice({
    name: 'subCategoryPage',
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
        getSubCategoryListRequest: () => { },
        getSubCategoryListSuccess: (state, action) => {
            state.subCategoryList = action.payload
        },
        getSubCategoryListFail: () => { },
        addSubCategoryRequest: () => { },
        addSubCategorySuccess: () => { },
        addSubCategoryFail: () => { },
        editSubCategoryRequest: () => { },
        editSubCategorySuccess: () => { },
        editSubCategoryFail: () => { },
        getIdSubCategoryRequest: () => { },
        getIdSubCategorySuccess: (state, action) => { state.subCategoryById = action.payload },
        getIdSubCategoryFail: () => { },
        openModalAdd: (state) => { state.modalAdd = true },
        closeModalAdd: (state) => { state.modalAdd = false },
        openModalEdit: (state) => { state.modalEdit = true },
        closeModalEdit: (state) => { state.modalEdit = false },
        deleteSubCategoryRequest: () => { },
        deleteSubCategorySuccess: () => { },
        deleteSubCategoryFail: () => { },
        changeCategoryName: (state, action) => {state.categoryName = action.payload}
    }
})

const subCategoryPageReducer = subCategoryPageSlice.reducer

export const {
    changePageNum,
    changePageSize,
    changeSearch,
    getSubCategoryListRequest,
    getSubCategoryListSuccess,
    getSubCategoryListFail,
    changeCategoryName,
    addSubCategoryFail,
    addSubCategoryRequest,
    addSubCategorySuccess,
    closeModalAdd,
    closeModalEdit,
    editSubCategoryFail,
    editSubCategoryRequest,
    editSubCategorySuccess,
    getIdSubCategoryFail,
    getIdSubCategoryRequest,
    getIdSubCategorySuccess,
    openModalAdd,
    openModalEdit,
    deleteSubCategoryFail,
    deleteSubCategoryRequest,
    deleteSubCategorySuccess
} = subCategoryPageSlice.actions

export default subCategoryPageReducer