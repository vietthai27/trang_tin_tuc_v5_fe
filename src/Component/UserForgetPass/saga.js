import { all, call, put, takeLatest } from "redux-saga/effects";
import { setLoading, setLoginState } from "../../rootReducer";
import { userForgetPassApi, userResetPassApi } from "./api";
import { userForgetPassFail, userForgetPassSuccess, userResetPassFail, userResetPassSuccess } from "./reducer";
import { closemodalResetpass, openModalLogin } from "../UserManage/reducer";

function* workUserForgetPass({ payload }) {
    try {
        yield put(setLoading(true))
        const response = yield call(userForgetPassApi, payload)
        yield put(setLoading(false))
        yield put(userForgetPassSuccess(response))
        yield put(openModalLogin())
    } catch (e) {
        yield put(setLoading(false))
        yield put(userForgetPassFail(e))
    }
}

function* userForgetPassSaga() {
    yield takeLatest('userForgetPass/userForgetPassRequest', workUserForgetPass)
}

function* workUserResetPass({ payload }) {
    try {
        yield put(setLoading(true))
        const response = yield call(userResetPassApi, payload)
        yield put(setLoading(false))
        yield put(userResetPassSuccess(response))
        yield put(closemodalResetpass())
        yield put(setLoginState(false))
        yield put(openModalLogin())
    } catch (e) {
        yield put(setLoading(false))
        yield put(userResetPassFail(e))
    }
}

function* userResetPassSaga() {
    yield takeLatest('userResetPass/userResetPassRequest', workUserResetPass)
}


function* userChangePassSaga() {
    yield all([
        userResetPassSaga(),
        userForgetPassSaga()
    ])
}
export default userChangePassSaga