import { all, call, put, takeLatest } from "redux-saga/effects";
import menuSaga from "./Component/Menu/saga";
import userLoginSaga from "./Component/UserLogin/saga";
import { checkTokenFail, checkTokenSuccess } from "./rootReducer";
import { checkTokenApi } from "./ultil";

function* workCheckToken({ payload }) {
    try {
        const tokenState = yield call(checkTokenApi, payload)
        yield put(checkTokenSuccess(tokenState))
    } catch (error) {
        yield put(checkTokenFail(error))
    }
}

function* appSaga() {
    yield takeLatest('app/checkToken', workCheckToken)

}

export default function* rootSaga() {
    yield all([
        appSaga(),
        menuSaga(),
        userLoginSaga()
    ]);
}