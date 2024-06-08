import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState = {
    userListData: [],
    userListDataPaging: [],
    pageNum: 1,
    pageSize: 5,
    search: ''
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
            const userList = addHasModerRole(action.payload.content)
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
            const userList = addHasModerRole(action.payload.content)
            state.userListData = userList
        },
        searchUserFail: () => { },
        setModerRoleRequest: () => { },
        setModerRoleSuccess: () => { toast.success("Đặt quyền MODER thành công") },
        setModerRoleFail: () => { },
        deleteModerRoleRequest: () => { },
        deleteModerRoleSuccess: () => { toast.success("Hủy quyền MODER thành công") },
        deleteModerRoleFail: () => { },
        deleteUserRequest: () => { },
        deleteUserSuccess: () => { toast.success("Xóa người dùng thành công") },
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