import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginFetch } from "./api";
import { userLoginFail, userLoginSuccess } from "./reducer";
import { toast } from "react-toastify";
import { setLoginState } from "../../rootReducer";
import { closeModalLogin } from "../UserManage/reducer";

function* workUserLogin({ payload }) {
    try {
        const response = yield call(userLoginFetch, payload)
        yield put(userLoginSuccess(response))
        yield put(setLoginState(true))
        yield put(closeModalLogin())
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