import * as types from "./constant";

const initalState = {
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

const userManageReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.OPEN_MODAL_LOGIN:
            return { modalLogin: true }
        case types.CLOSE_MODAL_LOGIN:
            return { modalLogin: false }
        case types.OPEN_MODAL_SIGNUP:
            return { modalSignup: true }
        case types.CLOSE_MODAL_SIGNUP:
            return { modalSignup: false }
        case types.OPEN_MODAL_FORGETPASS:
            return { modalForgetpass: true }
        case types.CLOSE_MODAL_FORGETPASS:
            return { modalForgetpass: false }
        case types.OPEN_MODAL_RESETPASS:
            return { modalResetpass: true }
        case types.CLOSE_MODAL_RESETPASS:
            return { modalResetpass: false }
        case types.CHANGE_USERNAME:
            return {
                ...state, userData: { ...state.userData, username: action.payload }
            }
        case types.CHANGE_PASSWORD:
            return {
                ...state, userData: { ...state.userData, password: action.payload }
            }
        case types.CHANGE_EMAIL:
            return {
                ...state, userData: { ...state.userData, email: action.payload }
            }
        case types.CHANGE_PASSWORD_RETYPE:
            return {
                ...state, userData: { ...state.userData, passwordRetype: action.payload }
            }
        default:
            return { ...state }
    }
}

export default userManageReducer