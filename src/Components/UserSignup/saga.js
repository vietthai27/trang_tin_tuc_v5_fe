import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects"
import { userSignupRequestApi, userSignupValidateApi } from "./api"
import { setUserSignupValidate, userSignupRequest, userSignupRequestFail, userSignupRequestSuccess, userSignupValidateFail, userSignupValidateRequest, userSignupValidateSuccess } from "./reducer"
import { openModalLogin } from "../Header/reducer"
import { endLoading, startLoading } from "../../App/rootReducer"
import { toast } from "react-toastify"

function* workUserSignupValidate({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userSignupValidateApi, payload)
        yield put(userSignupValidateSuccess(response))
        yield put(setUserSignupValidate(false))
        yield put(openModalLogin())
        toast.success(response.data.message)
    } catch (e) {
        yield put(userSignupValidateFail())
        toast.error(e?.response?.data?.message || "Xác thực thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* userSignupValidateSaga() {
    yield takeLeading(userSignupValidateRequest, workUserSignupValidate)
}

function* workUserSignupRequest({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userSignupRequestApi, payload)
        yield put(userSignupRequestSuccess())
        yield put(setUserSignupValidate(true))
        toast.success(response.data.message)
    } catch (e) {
        yield put(userSignupRequestFail())
        toast.error(e?.response?.data?.message || "Đăng ký thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* userSignupRequestSaga() {
    yield takeLatest(userSignupRequest, workUserSignupRequest)
}

function* userSignupSaga() {
    yield all([
        userSignupRequestSaga(),
        userSignupValidateSaga()
    ])
}

export default userSignupSaga