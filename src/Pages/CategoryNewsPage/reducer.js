import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subCategoryList: [],
    newsByCategoryList: [],
    categoryName: '',
    search: '',
    pageNum: 0,
    pageSize: 10,
}

const categoryNewPageSlice = createSlice({
    name: 'categoryNewPage',
    initialState,
    reducers: {
        getSubCategoryListRequest: () => { },
        getSubCategoryListSuccess: (state, action) => {
            state.subCategoryList = action.payload
        },
        getSubCategoryListFail: () => { },
        getNewsBySubCategoryRequest: () => { },
        getNewsBySubCategorySuccess: (state, action) => {
            state.newsByCategoryList = action.payload
        },
        getNewsBySubCategoryFail: () => { },
        changeCategoryName: (state, action) => { state.categoryName = action.payload },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        changePageSize: (state, action) => {
            state.pageSize = action.payload
        },
    }
})

const categoryNewPageReducer = categoryNewPageSlice.reducer

export const {
    getSubCategoryListRequest,
    getSubCategoryListSuccess,
    getSubCategoryListFail,
    changeCategoryName,
    getNewsBySubCategoryFail,
    getNewsBySubCategoryRequest,
    getNewsBySubCategorySuccess,
    changePageNum,
    changePageSize,
    changeSearch
} = categoryNewPageSlice.actions

export default categoryNewPageReducer