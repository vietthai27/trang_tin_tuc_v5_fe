import { all, call, put, takeLatest } from "redux-saga/effects";
import userLoginSaga from "./Component/UserLogin/saga";
import userSignupSaga from "./Component/UserSignup/saga";
import userChangePassSaga from "./Component/UserForgetPass/saga";
import userListSaga from "./Pages/UserListPage/saga";
import { checkUserSessionFail, checkUserSessionRequest, checkUserSessionSuccess } from "./rootReducer";
import { checkUserSessionApi } from "./rootApi";
import { toast } from "react-toastify";
import bankListSaga from "./Pages/BankListPage/saga";
import accountListSaga from "./Pages/AccountPage/saga";
import billListSaga from "./Pages/BillPage/saga"

function* checkUserSessionWorker({ payload }) {
    try {
        const res = yield call(checkUserSessionApi, payload)
        yield put(checkUserSessionSuccess(res.data))
    } catch (e) {
        if(e.response.status === 403) {
            yield put(checkUserSessionFail())
            localStorage.removeItem("token")
            toast.warn(e.response.data.message)
        }  
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
        userListSaga(),
        bankListSaga(),
        accountListSaga(),
        billListSaga()
    ]);
}