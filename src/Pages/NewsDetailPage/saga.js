import { all, call, put, takeLatest } from "redux-saga/effects";
import { endLoading, startLoading } from "../../rootReducer";
import { getNewsDetailApi } from "./api";
import { newsDetailFail, newsDetailRequest, newsDetailSuccess } from "./redux";

function* newsDetailWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getNewsDetailApi, payload)
        yield put(newsDetailSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(newsDetailFail())
    }
}

function* newsDetailWatcher() {
    yield takeLatest(newsDetailRequest, newsDetailWorker)
}


function* newsDetailSaga() {
    yield all([
        newsDetailWatcher(),
    ])
}

export default newsDetailSaga