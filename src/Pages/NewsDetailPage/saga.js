import { all, call, put, takeLatest } from "redux-saga/effects";
import { endLoading, startLoading } from "../../rootReducer";
import { getNewsCaroselApi, getNewsDetailApi } from "./api";
import { newsDetailFail, newsDetailRequest, newsDetailSuccess, requestNewsCarousel, requestNewsCarouselFail, requestNewsCarouselSuccess } from "./redux";

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

function* newsCarouselWorker() {
    try {
        yield put(startLoading())
        const res = yield call(getNewsCaroselApi)
        yield put(requestNewsCarouselSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(requestNewsCarouselFail())
    }
}

function* newsCarouselWatcher() {
    yield takeLatest(requestNewsCarousel, newsCarouselWorker)
}



function* newsDetailSaga() {
    yield all([
        newsDetailWatcher(),
        newsCarouselWatcher()
    ])
}

export default newsDetailSaga