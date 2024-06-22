import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    menuListData: [],
    menuListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: '',
    listMenuItem:'',
    itemId:0
}

const menuListSlice = createSlice({
    name: "menuList",
    initialState,
    reducers: {
        getMenuListRequest:() => {

        },
        getMenuListSuccess:(state, action) => {
           state.menuListData = action.payload.content
           state.menuListDataPaging = action.payload
        },
        getMenuListFail:() => {

        },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        addMenuListRequest:() => {

        },
        addMenuListSuccess:(state, action) => {
          
        },
        addMenuListFail:() => {

        },
        editMenuListRequest:() => {

        },
        editMenuListSuccess:(state, action) => {
          
        },
        editMenuListFail:() => {

        },
        deleteMenuListRequest:() => {

        },
        deleteMenuListSuccess:(state, action) => {
          
        },
        deleteMenuListFail:() => {

        },
        changeMenuItem:(state, action) => {
            state.listMenuItem = action.payload
        },
        chageItemId:(state, action) => {
            state.itemId = action.payload
        }
    }
})

export const {
    getMenuListFail,
    getMenuListRequest,
    getMenuListSuccess,
    changePageNum,
    changeSearch,
    addMenuListFail,
    addMenuListRequest,
    addMenuListSuccess,
    deleteMenuListFail,
    deleteMenuListRequest,
    deleteMenuListSuccess,
    editMenuListFail,
    editMenuListRequest,
    editMenuListSuccess,
    changeMenuItem,
    chageItemId
} = menuListSlice.actions

const menuListReducer = menuListSlice.reducer

export default menuListReducer