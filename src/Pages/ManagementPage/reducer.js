import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search:'',
    pageNum: 0,
    pageSize: 10,
    userList:[]
}

const userPageSlice = createSlice({
    name: 'userPage',
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
        getUserListRequest: () => {},
        getUserListSuccess: (state, action) => {
            state.userList = action.payload
        },
        getUserListFail: () => {},
        changeModerRoleRequest: () => {},
        changeModerRoleSuccess: () => {},
        changeModerRoleFail: () => {}
    }
})

const userPageReducer = userPageSlice.reducer

export const {
   changePageNum,
   changePageSize,
   changeSearch,
   getUserListFail,
   getUserListRequest,
   getUserListSuccess,
   changeModerRoleFail,
   changeModerRoleRequest,
   changeModerRoleSuccess
} = userPageSlice.actions

export default userPageReducer