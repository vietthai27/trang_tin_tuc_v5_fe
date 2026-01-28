import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    pageNum: 0,
    pageSize: 10,
    categoryList: [],
    modalAdd: false,
    modalEdit: false,
    categoryById: {},
}

const categoryPageSlice = createSlice({
    name: 'categoryPage',
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
        getCategoryListRequest: () => { },
        getCategoryListSuccess: (state, action) => {
            state.categoryList = action.payload
        },
        getCategoryListFail: () => { },
        addCategoryRequest: () => { },
        addCategorySuccess: () => { },
        addCategoryFail: () => { },
        editCategoryRequest: () => { },
        editCategorySuccess: () => { },
        editCategoryFail: () => { },
        getIdCategoryRequest: () => { },
        getIdCategorySuccess: (state, action) => { state.categoryById = action.payload },
        getIdCategoryFail: () => { },
        openModalAdd: (state) => { state.modalAdd = true },
        closeModalAdd: (state) => { state.modalAdd = false },
        openModalEdit: (state) => { state.modalEdit = true },
        closeModalEdit: (state) => { state.modalEdit = false },
        deleteCategoryRequest: () => { },
        deleteCategorySuccess: () => { },
        deleteCategoryFail: () => { },
    }
})

const categoryPageReducer = categoryPageSlice.reducer

export const {
    changePageNum,
    changePageSize,
    changeSearch,
    getCategoryListRequest,
    getCategoryListSuccess,
    getCategoryListFail,
    getRoleListFail,
    getRoleListRequest,
    getRoleListSuccess,
    addCategoryFail,
    addCategoryRequest,
    addCategorySuccess,
    closeModalAdd,
    closeModalEdit,
    openModalAdd,
    openModalEdit,
    editCategoryFail,
    editCategoryRequest,
    editCategorySuccess,
    getIdCategoryFail,
    getIdCategoryRequest,
    getIdCategorySuccess,
    deleteCategoryFail,
    deleteCategoryRequest,
    deleteCategorySuccess,
} = categoryPageSlice.actions

export default categoryPageReducer