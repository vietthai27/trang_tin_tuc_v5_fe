import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDataForgetPass: {
        username: '',
        email: '',
    },
    userDataResetPass: {
        newPassword: '',
        oldPassword: '',
        newPasswordValidate: '',
    }
}

const userForgetPassSlice = createSlice({
    name: 'userForgetPass',
    initialState,
    reducers: {
        changeUsernameForgetPass: (state, action) => {
            state.userDataForgetPass.username = action.payload
        },
        changeEmailForgetPass: (state, action) => {
            state.userDataForgetPass.email = action.payload
        },
        changeNewPass: (state, action) => {
            state.userDataResetPass.newPassword = action.payload
        },
        changeNewPassValidate: (state, action) => {
            state.userDataResetPass.newPasswordValidate = action.payload
        },
        changeOldPass: (state, action) => {
            state.userDataResetPass.oldPassword = action.payload
        },
        userForgetPassRequest: () => { },
        userForgetPassSuccess: () => { },
        userForgetPassFail: () => { },
        userResetPassRequest: () => { },
        userResetPassSuccess: () => { },
        userResetPassFail: () => { },
    }
})

export const {
    changeUsernameForgetPass,
    changeEmailForgetPass,
    userForgetPassRequest,
    userForgetPassSuccess,
    userForgetPassFail,
    changeNewPass,
    changeOldPass,
    userResetPassFail,
    userResetPassRequest,
    userResetPassSuccess,
    changeNewPassValidate
} = userForgetPassSlice.actions

export const userForgetPassReducer = userForgetPassSlice.reducer