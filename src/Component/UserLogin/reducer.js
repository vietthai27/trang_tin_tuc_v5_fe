import { createSlice } from "@reduxjs/toolkit";

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
            localStorage.setItem("Is login", true)
            state.loginState = true
        },
        userLoginFail: (state) => {
            state.loading = false
        },
        setLoginState: (state, action) => {
            state.loginState = action.payload
        }
    }
})

const userLoginReducer = userLoginSlice.reducer

export const {
    changeUsername,
    changePassword,
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,
    setLoginState
} = userLoginSlice.actions

export default userLoginReducer