import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDataSignup: {
        username: '',
        password: '',
        retypePassword: '',
        email: '',
        validateCode: ''
    },
    userSignupValidate: false
}

const userSignupSlice = createSlice({
    name: 'userSignup',
    initialState,
    reducers: {
        changeUsernameSignup: (state, action) => {
            state.userDataSignup.username = action.payload
        },
        changePasswordSignup: (state, action) => {
            state.userDataSignup.password = action.payload
        },
        changeEmailSignup: (state, action) => {
            state.userDataSignup.email = action.payload
        },
        changeRetypePasswordSignup: (state, action) => {
            state.userDataSignup.retypePassword = action.payload
        },
        changeValidateCodeSignup: (state, action) => {
            state.userDataSignup.validateCode = action.payload
        },
        userSignupValidateRequest: () => { },
        userSignupValidateSuccess: () => { },
        userSignupValidateFail: () => { },
        userSignupRequest: () => { },
        userSignupRequestSuccess: () => { },
        userSignupRequestFail: () => { },
        setUserSignupValidate: (state, action) => {
            state.userSignupValidate = action.payload
        }
    }
})

const userSignupReducer = userSignupSlice.reducer

export const {
    changeUsernameSignup,
    changePasswordSignup,
    changeEmailSignup,
    changeRetypePasswordSignup,
    userSignupValidateRequest,
    userSignupValidateSuccess,
    userSignupValidateFail,
    userSignupRequest,
    userSignupRequestSuccess,
    userSignupRequestFail,
    setUserSignupValidate,
    changeValidateCodeSignup
} = userSignupSlice.actions

export default userSignupReducer