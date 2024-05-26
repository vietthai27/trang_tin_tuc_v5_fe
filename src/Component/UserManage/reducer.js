import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalLogin: false,
    modalSignup: false,
    modalForgetpass: false,
    modalResetpass: false,
    userData: {
        username: '',
        password: '',
        email: '',
        passwordRetype: ''
    }
}

const userManageSlice = createSlice({
    name: 'userManage',
    initialState,
    reducers: {
        openModalLogin: (state) => {
            state.modalSignup = false
            state.modalForgetpass = false
            state.modalLogin = true       
        },
        closeModalLogin: (state) => {
            state.modalLogin = false
        },
        openmodalSignup: (state) => {
            state.modalLogin = false
            state.modalSignup = true
        },
        closemodalSignup: (state) => {
            state.modalSignup = false
        },
        openmodalForgetpass: (state) => {
            state.modalLogin = false
            state.modalForgetpass = true
        },
        closemodalForgetpass: (state) => {
            state.modalForgetpass = false
        },
        openmodalResetpass: (state) => {
            state.modalResetpass = true
        },
        closemodalResetpass: (state) => {
            state.modalResetpass = false
        },

    }
})

const userManageReducer = userManageSlice.reducer

export const {
    openModalLogin,
    closeModalLogin,
    openmodalSignup,
    closemodalSignup,
    openmodalForgetpass,
    closemodalForgetpass,
    openmodalResetpass,
    closemodalResetpass,
} = userManageSlice.actions

export default userManageReducer