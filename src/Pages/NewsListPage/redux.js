import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newsListData: [],
    newsListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: '',
    idCha: 1,
    idCon: 0,
    subMenu: [],
    addContent: '',
    tenBaiBao: '',
    tieuDe: '',
    thumbnail: '',
}


const newsListSlice = createSlice({
    name: "newsList",
    initialState,
    reducers: {
        searchNewsRequest: () => { },
        searchNewsSuccess: (state, action) => {
            state.newsListDataPaging = action.payload
            state.newsListData = action.payload.content
        },
        searchNewsFail: () => { },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changeIdCha: (state, action) => {
            state.idCha = action.payload
        },
        changeIdCon: (state, action) => {
            state.idCon = action.payload
        },
        getSubMenuRequeset: (state, action) => {

        },
        getSubMenuSuccess: (state, action) => {
            state.subMenu = action.payload
        },
        getSubMenuFail: (state, action) => {

        },
        changeAddContent: (state, action) => {
            state.addContent = action.payload
        },
        addNewsRequest: (state, action) => {

        },
        addNewsSuccess: (state, action) => {

        },
        addNewsFail: (state, action) => {

        },
        editNewsRequest: (state, action) => {

        },
        editNewsSuccess: (state, action) => {

        },
        editNewsFail: (state, action) => {

        },
        deleteNewsRequest: (state, action) => {

        },
        deleteNewsSuccess: (state, action) => {

        },
        deleteNewsFail: (state, action) => {

        },
        changeTenBaiBao: (state, action) => {
            state.tenBaiBao = action.payload
        },
        changeTieuDe: (state, action) => {
            state.tieuDe = action.payload
        },
        changeThumbnail: (state, action) => {
            state.thumbnail = action.payload
        },
    }
})

export const {
    searchNewsFail,
    searchNewsRequest,
    searchNewsSuccess,
    changePageNum,
    changeSearch,
    changeIdCha,
    changeIdCon,
    getSubMenuFail,
    getSubMenuRequeset,
    getSubMenuSuccess,
    changeAddContent,
    addNewsFail,
    addNewsRequest,
    addNewsSuccess,
    changeTenBaiBao,
    changeThumbnail,
    changeTieuDe,
    editNewsFail,
    editNewsRequest,
    editNewsSuccess,
    deleteNewsFail,
    deleteNewsRequest,
    deleteNewsSuccess
    
} = newsListSlice.actions

const newsListReducer = newsListSlice.reducer

export default newsListReducer