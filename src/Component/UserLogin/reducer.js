import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        username: '',
        password: '',
    },
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
        },
        userLoginSuccess: (state, action) => {
            localStorage.setItem("Username", action.payload.data.username)
            localStorage.setItem("User token", action.payload.data.jwttoken)
        },
        userLoginFail: (state) => {
        },
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