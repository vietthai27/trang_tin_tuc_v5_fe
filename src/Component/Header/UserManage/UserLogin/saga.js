import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginFetch } from "./api";
import { userLoginFail, userLoginSuccess } from "./reducer";
import { toast } from "react-toastify";

function* workUserLogin({ payload }) {
    try {
        const response = yield call(userLoginFetch, payload)
        yield put(userLoginSuccess(response))
        toast.success("Đăng nhập thành công")
    } catch (e) {
        toast.warn(e.response.data.message);
        yield put(userLoginFail())
    }
}

function* userLoginSaga() {
    yield takeLatest('userLogin/userLoginRequest', workUserLogin)

}

export default userLoginSaga