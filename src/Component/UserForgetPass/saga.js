import { all, call, put, takeLatest } from "redux-saga/effects";
import { endLoading, setLoginState, startLoading } from "../../rootReducer";
import { userForgetPassApi, userResetPassApi } from "./api";
import { userForgetPassFail, userForgetPassSuccess, userResetPassFail, userResetPassSuccess } from "./reducer";
import { closemodalResetpass, openModalLogin } from "../UserManage/reducer";
import { notify } from "../../ultil";

function* workUserForgetPass({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userForgetPassApi, payload)
        yield put(endLoading())
        yield put(userForgetPassSuccess(response))
        yield put(openModalLogin())
        notify(response.data.status, response.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(userForgetPassFail(e))
    }
}

function* userForgetPassSaga() {
    yield takeLatest('userForgetPass/userForgetPassRequest', workUserForgetPass)
}

function* workUserResetPass({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(userResetPassApi, payload)
        yield put(endLoading())
        yield put(userResetPassSuccess(response))
        yield put(closemodalResetpass())
        yield put(setLoginState(false))
        yield put(openModalLogin())
        notify(response.data.status, response.data.message)
    } catch (e) {
        yield put(endLoading())
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