import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listNews: [],
    searchTitle: '',
    searchDescription: '',
    pageNum: 0,
    pageSize: 10,
    addSuccess: false,
    newsById: {},
    editSuccess: false
}

const newsManagePageSlice = createSlice({
    name: 'newsManagePage',
    initialState,
    reducers: {
        addNewsRequest: () => { },
        addNewsSuccess: () => {},
        addNewsFail: () => { },
        editNewsRequest: () => { },
        editNewsSuccess: () => {},
        editNewsFail: () => { },
        getListNewsRequest: () => { },
        getListNewsSuccess: (state, action) => { state.listNews = action.payload },
        getListNewsFail: () => { },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        changeAddSuccess: (state, action) => {state.addSuccess = action.payload },
        resetAdd: (state) => {state.addSuccess = false},
        changeEditSuccess: (state, action) => {state.editSuccess = action.payload },
        resetEdit: (state) => {state.editSuccess = false},
        deleteNewsRequest: () => { },
        deleteNewsSuccess: () => {},
        deleteNewsFail: () => { },
        getNewsByIdRequest: () => { },
        getNewsByIdSuccess: (state, action) => {state.newsById = action.payload},
        getNewsByIdFail: () => { },

    }
})

const newsManagePageReducer = newsManagePageSlice.reducer

export const {
    addNewsFail,
    addNewsRequest,
    addNewsSuccess,
    getListNewsFail,
    getListNewsRequest,
    getListNewsSuccess,
    changePageNum,
    changeAddSuccess,
    resetAdd,
    deleteNewsFail,
    deleteNewsRequest,
    deleteNewsSuccess,
    getNewsByIdFail,
    getNewsByIdRequest,
    getNewsByIdSuccess,
    changeEditSuccess,
    resetEdit,
    editNewsFail,
    editNewsRequest,
    editNewsSuccess
} = newsManagePageSlice.actions

export default newsManagePageReducer