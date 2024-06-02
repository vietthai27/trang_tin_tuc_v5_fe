import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginFail, userLoginSuccess } from "./reducer";
import { toast } from "react-toastify";
import { setLoading, setLoginState } from "../../rootReducer";
import { closeModalLogin } from "../UserManage/reducer";
import { userLoginApi } from "./api";

function* workUserLogin({ payload }) {
    try {
        yield put(setLoading(true))
        const response = yield call(userLoginApi, payload)
        yield put(setLoading(false))
        yield put(userLoginSuccess(response))
        yield put(setLoginState(true))
        yield put(closeModalLogin())
        toast.success("Đăng nhập thành công")
    } catch (e) {
        yield put(setLoading(false))
        toast.warn(e.response.data.message);
        yield put(userLoginFail())
    }
}

function* userLoginSaga() {
    yield takeLatest('userLogin/userLoginRequest', workUserLogin)

}

export default userLoginSaga