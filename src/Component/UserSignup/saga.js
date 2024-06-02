import { all, call, put, takeLatest } from "redux-saga/effects"
import { userSignupRequestApi, userSignupValidateApi } from "./api"
import { setUserSignupValidate, userSignupRequestFail, userSignupRequestSuccess, userSignupValidateFail, userSignupValidateSuccess } from "./reducer"
import { setLoading } from "../../rootReducer"
import { closemodalSignup, openModalLogin } from "../UserManage/reducer"

function* workUserSignupValidate({ payload }) {
    try {
        yield put(setLoading(true))
        const response = yield call(userSignupValidateApi, payload)
        yield put(setUserSignupValidate(false))
        yield put(userSignupValidateSuccess(response))
        yield put(openModalLogin())
        yield put(setLoading(false))
    } catch (e) {
        yield put(setLoading(false))
        yield put(userSignupValidateFail(e))
    }
}

function* userSignupValidateSaga() {
    yield takeLatest('userSignup/userSignupValidateRequest', workUserSignupValidate)
}

function* workUserSignupRequest({ payload }) {
    try {
        yield put(setLoading(true))
        const response = yield call(userSignupRequestApi, payload)
        yield put(userSignupRequestSuccess(response))   
        yield put(setLoading(false))
        yield put(closemodalSignup())
        yield put(setUserSignupValidate(true))
    } catch (e) {
        yield put(setLoading(false))
        yield put(userSignupRequestFail(e))
    }
}

function* userSignupRequestSaga() {
    yield takeLatest('userSignup/userSignupRequest', workUserSignupRequest)
}

function* userSignupSaga() {
    yield all([
        userSignupRequestSaga(),
        userSignupValidateSaga()
    ])
}

export default userSignupSaga