import * as types from "./constant"

export const openModalLogin = {
    type: types.OPEN_MODAL_LOGIN
}

export const closeModalLogin = {
    type: types.CLOSE_MODAL_LOGIN
}

export const openModalSignup = {
    type: types.OPEN_MODAL_SIGNUP
}

export const closeModalSignUp = {
    type: types.CLOSE_MODAL_SIGNUP
}

export const openModalForgetpass = {
    type: types.OPEN_MODAL_FORGETPASS
}

export const closeModalForgetpass = {
    type: types.CLOSE_MODAL_FORGETPASS
}

export const openModalResettpass = {
    type: types.OPEN_MODAL_RESETPASS
}

export const closeModalResetpass = {
    type: types.CLOSE_MODAL_RESETPASS
}

export const changeUsername = (username) => ({
    type: types.CHANGE_USERNAME,
    payload: username
});

export const changePassword = (password) => ({
    type: types.CHANGE_PASSWORD,
    payload: password
});

export const changeEmail = (email) => ({
    type: types.CHANGE_EMAIL,
    payload: email
});

export const changePasswordRetype = (passwordRetype) => ({
    type: types.CHANGE_PASSWORD_RETYPE,
    payload: passwordRetype
});

