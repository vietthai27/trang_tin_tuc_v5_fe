import { all, call, put, takeLatest } from "redux-saga/effects";
import userLoginSaga from "../Components/UserLogin/saga";
import userSignupSaga from "../Components/UserSignup/saga";
import userChangePassSaga from "../Components/UserForgetPass/saga";
import userListSaga from "../Pages/UserPage/saga";
import managementSaga from "../Pages/ManagementPage/saga"
import { checkUserSessionRequest, checkUserSessionSuccess } from "./rootReducer";
import headerSaga from "../Components/Header/saga";
import categorySaga from "../Pages/CategoryPage/saga"
import subCategorySaga from "../Pages/SubCategoryPage/saga";
import categoryNewsSaga from "../Pages/CategoryNewsPage/saga";
import uploadImageSaga from "../Components/ImageUploadWithPreview/saga";
import newsSaga from "../Pages/NewsManagePage/saga";
import getLatestNewsSaga from "../Components/NewsSlider/saga";
import getNewsDetailSaga from "../Pages/NewsDetailPage/saga";
import footballTableSaga from "../Components/FootballTable/saga";
import weatherSaga from "../Components/Weather/saga";
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
        userListSaga(),
        managementSaga(),
        categorySaga(),
        subCategorySaga(),
        categoryNewsSaga(),
        uploadImageSaga(),
        newsSaga(),
        getLatestNewsSaga(),
        getNewsDetailSaga(),
        footballTableSaga(),
        weatherSaga()
    ]);
}