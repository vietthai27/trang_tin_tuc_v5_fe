import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
    userDataSignup: {
        username: '',
        password: '',
        retypePassword: '',
        email: '',
        validateCode: '',
        fullName:''
    },
    userSignupValidate: false
}

const userSignupSlice = createSlice({
    name: 'userSignup',
    initialState,
    reducers: {
        changeFullNameSignup: (state, action) => {
            state.userDataSignup.fullName = action.payload
        },
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
        userSignupValidateRequest: (state) => {
        },
        userSignupValidateSuccess: (state, action) => {
            toast.success(action.payload.data)
        },
        userSignupValidateFail: (state, action) => {
            toast.warn(action.payload.response.data.message)
        },
        userSignupRequest: (state) => {
        },
        userSignupRequestSuccess: (state, action) => {
            toast.success(action.payload.data)
        },
        userSignupRequestFail: (state, action) => {
            toast.warn(action.payload.response.data.message)
        },
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
    changeValidateCodeSignup,
    changeFullNameSignup
} = userSignupSlice.actions

export default userSignupReducer