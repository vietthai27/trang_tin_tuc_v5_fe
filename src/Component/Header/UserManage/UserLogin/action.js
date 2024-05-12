import * as types from './constant'

export const userLoginRequest = (userData) => ({
    type: types.USER_LOGIN_REQUEST,
    payload: userData
})
export const userLoginSuccess = (token) => ({
    type: types.USER_LOGIN_SUCCESS,
    payload: token
})
export const userLoginFail = (error) => ({
    type: types.USER_LOGIN_FAIL,
    payload: error
})