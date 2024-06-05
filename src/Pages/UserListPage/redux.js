import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userListData: [],
    userListDataPaging: []
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
        getAllUserFail: () => { },
        setModerRoleRequest: () => { },
        setModerRoleSuccess: () => { },
        setModerRoleFail: () => { },
        deleteModerRoleRequest: () => { },
        deleteModerRoleSuccess: () => { },
        deleteModerRoleFail: () => { },
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
    deleteModerRoleSuccess
} = userListSlice.actions

const userListReducer = userListSlice.reducer

export default userListReducer