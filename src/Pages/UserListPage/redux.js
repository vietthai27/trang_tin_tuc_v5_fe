import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userListData: [],
    userListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: '',

}

const addHasModerRole = (userListData) => {
    return userListData.map(item => ({
        ...item,
        hasModerRole: item.listRoles.some(role => role.roleName === 'MODER')
    }));
};

const userListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        getAllUserRequest: () => { },
        getAllUserSuccess: (state, action) => {
            state.userListDataPaging = action.payload
            const userList = addHasModerRole(action.payload.data.content)
            state.userListData = userList
        },
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changePageNum: (state, action) => {
            state.pageNum = action.payload
        },
        getAllUserFail: () => { },
        searchUserRequest: () => { },
        searchUserSuccess: (state, action) => {
            state.userListDataPaging = action.payload
            const userList = addHasModerRole(action.payload.data.content)
            state.userListData = userList
        },
        searchUserFail: () => { },
        setModerRoleRequest: () => { },
        setModerRoleSuccess: () => {  },
        setModerRoleFail: () => { },
        deleteModerRoleRequest: () => { },
        deleteModerRoleSuccess: () => { },
        deleteModerRoleFail: () => { },
        deleteUserRequest: () => { },
        deleteUserSuccess: () => {  },
        deleteUserFail: () => { },
       

    }
})

export const {
    getAllUserFail,
    getAllUserRequest,
    getAllUserSuccess,
    setModerRoleFail,
    setModerRoleRequest,
    setModerRoleSuccess,
    deleteModerRoleFail,
    deleteModerRoleRequest,
    deleteModerRoleSuccess,
    searchUserFail,
    searchUserRequest,
    searchUserSuccess,
    changeSearch,
    changePageNum,
    deleteUserRequest,
    deleteUserFail,
    deleteUserSuccess
} = userListSlice.actions

const userListReducer = userListSlice.reducer

export default userListReducer