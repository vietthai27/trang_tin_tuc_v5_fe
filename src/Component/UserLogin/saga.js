import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginFail, userLoginSuccess } from "./reducer";
import { toast } from "react-toastify";
import { endLoading, setLoginState, setUsername, startLoading } from "../../rootReducer";
import { closeModalLogin } from "../UserManage/reducer";
import { userLoginApi } from "./api";
import { notify } from "../../ultil";

function* workUserLogin({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userLoginApi, payload)
        yield put(endLoading())
        yield put(setUsername(payload.username))
        yield put(userLoginSuccess(response))
        yield put(setLoginState(true))
        yield put(closeModalLogin())
        notify(response.data.status, response.data.message)
    } catch (e) {
        yield put(endLoading())
        toast.warn(e.response.data.message);
        yield put(userLoginFail())
    }
}

function* userLoginSaga() {
    yield takeLatest('userLogin/userLoginRequest', workUserLogin)
}

export default userLoginSaga