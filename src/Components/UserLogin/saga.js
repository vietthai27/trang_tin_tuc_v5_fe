import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginFail, userLoginRequest, userLoginSuccess } from "./reducer";
import { toast } from "react-toastify";
import { closeModalLogin } from "../Header/reducer";
import { userLoginApi } from "./api";
import { endLoading, setLoginState, setUsername, startLoading } from "../../App/rootReducer";

function* workUserLogin({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userLoginApi, payload)
        yield put(userLoginSuccess(response.data.data.token))
        yield put(setLoginState(true))
        yield put(setUsername(payload.username))
        yield put(closeModalLogin())
        toast.success(response.data.message)
    } catch (e) {       
        yield put(userLoginFail())
        toast.error(e?.response?.data?.message || "Đăng nhập thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* userLoginSaga() {
    yield takeLatest(userLoginRequest, workUserLogin)

}

export default userLoginSaga