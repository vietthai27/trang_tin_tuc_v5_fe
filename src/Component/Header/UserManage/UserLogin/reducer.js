import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    userData: {
        username: '',
        password: '',
    },
    loading:false,
    loginState:false
}

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            state.userData.username = action.payload
        },
        changePassword: (state, action) => {
            state.userData.password = action.payload
        },
        userLoginRequest: (state) => {
            state.loading = true
        },
        userLoginSuccess: (state, action) => {
            state.loading = false
            localStorage.setItem("Username", state.userData.username)
            localStorage.setItem("User token", action.payload.data)
            state.loginState = true
        },
        userLoginFail: (state,action) => {
            state.loading = false
        }
    }
})

const userLoginReducer = userLoginSlice.reducer

export const {
    changeUsername,
    changePassword,
    userLoginRequest,
    userLoginSuccess,
    userLoginFail
} = userLoginSlice.actions

export default userLoginReducer