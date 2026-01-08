import { createSlice } from "@reduxjs/toolkit"

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
    },
    managementList: [],
    categoryList: []
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        getManagementDataRequest: () => { },
        getManagementDataSuccess: (state, action) => {
            state.managementList = action.payload
        },
        getManagementDataFail: () => { },
        getCategoryDataRequest: () => { },
        getCategoryDataSuccess: (state, action) => {
            state.categoryList = action.payload
        },
        getCategoryDataFail: () => { },
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
        resetManagementList: (state) => {
            state.managementList = []
        }
    }
})

const headerReducer = headerSlice.reducer

export const { openModalLogin,
    closeModalLogin,
    openmodalSignup,
    closemodalSignup,
    openmodalForgetpass,
    closemodalForgetpass,
    openmodalResetpass,
    closemodalResetpass,
    getManagementDataFail,
    getManagementDataRequest,
    getManagementDataSuccess,
    getCategoryDataFail,
    getCategoryDataRequest,
    getCategoryDataSuccess,
    resetManagementList
} = headerSlice.actions

export default headerReducer