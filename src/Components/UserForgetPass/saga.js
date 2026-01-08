import { all, call, put, takeLatest } from "redux-saga/effects"
import { userForgetPassApi, userResetPassApi } from "./api"
import {
    userForgetPassFail,
    userForgetPassRequest,
    userForgetPassSuccess,
    userResetPassFail,
    userResetPassRequest,
    userResetPassSuccess
} from "./reducer"
import { closemodalResetpass, openModalLogin } from "../Header/reducer"
import { endLoading, setLoginState, startLoading } from "../../App/rootReducer"
import { toast } from "react-toastify"

function* workUserForgetPass({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userForgetPassApi, payload)
        yield put(userForgetPassSuccess())
        yield put(openModalLogin())
        toast.success(response.data.message)
    } catch (e) {
        yield put(userForgetPassFail())
        toast.error(e?.response?.data?.message || "Gửi yêu cầu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* workUserResetPass({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userResetPassApi, payload)
        yield put(userResetPassSuccess())
        localStorage.removeItem("token")
        yield put(setLoginState(false))
        yield put(closemodalResetpass())
        yield put(openModalLogin())
        toast.success(response.data.message)
    } catch (e) {
        yield put(userResetPassFail())
        toast.error(e?.response?.data?.message || "Đổi mật khẩu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* userForgetPassSaga() {
    yield takeLatest(userForgetPassRequest, workUserForgetPass)
}

function* userResetPassSaga() {
    yield takeLatest(userResetPassRequest, workUserResetPass)
}

export default function* userChangePassSaga() {
    yield all([
        userForgetPassSaga(),
        userResetPassSaga()
    ])
}
