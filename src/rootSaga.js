import { all, call, put, takeLatest } from "redux-saga/effects";
import menuSaga from "./Component/Menu/saga";
import userLoginSaga from "./Component/UserLogin/saga";
import userSignupSaga from "./Component/UserSignup/saga";
import userChangePassSaga from "./Component/UserForgetPass/saga";
import userListSaga from "./Pages/UserListPage/saga";
import { checkUserSessionFail, checkUserSessionRequest, checkUserSessionSuccess } from "./rootReducer";
import { checkUserSessionApi } from "./ultil";
import { toast } from "react-toastify";
import menuListSaga from "./Pages/MenuListPage/saga";
import subMenuListSaga from "./Pages/SubMenuListPage/saga";
import newsListSaga from "./Pages/NewsListPage/saga";
import newsDetailSaga from "./Pages/NewsDetailPage/saga";

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
        menuSaga(),
        userLoginSaga(),
        userSignupSaga(),
        userChangePassSaga(),
        userListSaga(),
        menuListSaga(),
        subMenuListSaga(),
        newsListSaga(),
        newsDetailSaga()
    ]);
}