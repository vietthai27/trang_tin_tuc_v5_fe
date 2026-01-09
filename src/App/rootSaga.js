import { all, call, put, takeLatest } from "redux-saga/effects";
import userLoginSaga from "../Components/UserLogin/saga";
import userSignupSaga from "../Components/UserSignup/saga";
import userChangePassSaga from "../Components/UserForgetPass/saga";
import userListSaga from "../Pages/UserPage/saga";
import { checkUserSessionRequest, checkUserSessionSuccess } from "./rootReducer";
import headerSaga from "../Components/Header/saga";
import { checkUserSessionApi } from "./ultil";

function* checkUserSessionWorker({ payload }) {
    try {
        const res = yield call(checkUserSessionApi, payload)
        yield put(checkUserSessionSuccess(res.data.data))
    } catch (e) {
    }
}

function* appSaga() {
    yield takeLatest(checkUserSessionRequest, checkUserSessionWorker)
}

export default function* rootSaga() {
    yield all([
        appSaga(),
        userLoginSaga(),
        userSignupSaga(),
        userChangePassSaga(),
        headerSaga(),
        userListSaga()
    ]);
}