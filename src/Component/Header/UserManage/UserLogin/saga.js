import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constant";
import { userLogin } from "./api";
import { userLoginFail } from "./action";
import { toast } from "react-toastify";

function* workUserLogin(payload) {

    const response = yield call(userLogin(payload))
    if (response.status === 500) {
        toast.warn(response.data.message)
        yield put(userLoginFail(response.data.message))
    }


}

function* userSaga() {
    yield takeLatest(types.USER_LOGIN_REQUEST, workUserLogin)

}

export default userSaga