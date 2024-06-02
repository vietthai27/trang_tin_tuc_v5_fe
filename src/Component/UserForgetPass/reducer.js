import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
    userDataForgetPass: {
        username: '',
        email: '',
    },
    userDataResetPass: {
        newPassword:'',
        oldPassword:'',
        newPasswordValidate:'',
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
        userForgetPassRequest: (state, action) => {

        },
        userForgetPassSuccess: (state, action) => {
            toast.success(action.payload.data)
        },
        userForgetPassFail: (state, action) => {
            toast.warn(action.payload.response.data.message)
        },
        userResetPassRequest: (state, action) => {

        },
        userResetPassSuccess: (state, action) => {
            toast.success(action.payload.data)
            localStorage.removeItem("Username")
            localStorage.removeItem("User token")
        },
        userResetPassFail: (state, action) => {
            toast.warn(action.payload.response.data.message)
        },
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