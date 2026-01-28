import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subCategoryList: [],
    categoryName: ''
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
        changeCategoryName: (state, action) => {state.categoryName = action.payload}
    }
})

const categoryNewPageReducer = categoryNewPageSlice.reducer

export const {
    getSubCategoryListRequest,
    getSubCategoryListSuccess,
    getSubCategoryListFail,
    changeCategoryName
} = categoryNewPageSlice.actions

export default categoryNewPageReducer