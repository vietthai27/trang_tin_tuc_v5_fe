import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    subMenuListData: [],
    subMenuListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: '',
    listSubMenuItem:'',
    itemId:0
}

const subMenuListSlice = createSlice({
    name: "subMenuList",
    initialState,
    reducers: {
        getSubMenuListRequest:() => {

        },
        getSubMenuListSuccess:(state, action) => {
           state.subMenuListData = action.payload.content
           state.subMenuListDataPaging = action.payload
        },
        getSubMenuListFail:() => {

        },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        addSubMenuListRequest:() => {

        },
        addSubMenuListSuccess:(state, action) => {
          
        },
        addSubMenuListFail:() => {

        },
        editSubMenuListRequest:() => {

        },
        editSubMenuListSuccess:(state, action) => {
          
        },
        editSubMenuListFail:() => {

        },
        deleteSubMenuListRequest:() => {

        },
        deleteSubMenuListSuccess:(state, action) => {
          
        },
        deleteSubMenuListFail:() => {

        },
        changeSubMenuItem:(state, action) => {
            state.listSubMenuItem = action.payload
        },
        chageItemId:(state, action) => {
            state.itemId = action.payload
        }
    }
})

export const {
addSubMenuListFail,
addSubMenuListRequest,
addSubMenuListSuccess,
chageItemId,
changePageNum,
changeSearch,
changeSubMenuItem,
deleteSubMenuListFail,
deleteSubMenuListRequest,
deleteSubMenuListSuccess,
editSubMenuListFail,
editSubMenuListRequest,
editSubMenuListSuccess,
getSubMenuListFail,
getSubMenuListRequest,
getSubMenuListSuccess
} = subMenuListSlice.actions

const subMenuListReducer = subMenuListSlice.reducer

export default subMenuListReducer