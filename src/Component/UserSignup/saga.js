import { all, call, put, takeLatest } from "redux-saga/effects"
import { userSignupRequestApi, userSignupValidateApi } from "./api"
import { setUserSignupValidate, userSignupRequestFail, userSignupRequestSuccess, userSignupValidateFail, userSignupValidateSuccess } from "./reducer"
import { endLoading, startLoading } from "../../rootReducer"
import { closemodalSignup, openModalLogin } from "../UserManage/reducer"
import { notify } from "../../ultil"

function* workUserSignupValidate({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userSignupValidateApi, payload)
        yield put(setUserSignupValidate(false))
        yield put(userSignupValidateSuccess(response))
        yield put(openModalLogin())
        yield put(endLoading())
        notify(response.data.status, response.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(userSignupValidateFail(e))
    }
}

function* userSignupValidateSaga() {
    yield takeLatest('userSignup/userSignupValidateRequest', workUserSignupValidate)
}

function* workUserSignupRequest({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userSignupRequestApi, payload)
        yield put(userSignupRequestSuccess(response))   
        yield put(endLoading())
        yield put(closemodalSignup())
        yield put(setUserSignupValidate(true))
        notify(response.data.status, response.data.message)
    } catch (e) {
        yield put(endLoading())
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