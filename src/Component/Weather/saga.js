import { all, call, put, takeLatest } from "redux-saga/effects"
import { getWeatherDataApi } from "./api"
import { getWeatherRequest, getWeatherRequestSucess } from "./redux"
import { endLoading, startLoading } from "../../rootReducer"

function* workGetWeaterData({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getWeatherDataApi, payload)
        yield put(getWeatherRequestSucess(response))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
    }
}

function* watchGetWeatherData() {
    yield takeLatest(getWeatherRequest, workGetWeaterData)
}

function* weatherSaga() {
    yield all([
        watchGetWeatherData()
    ])
}

export default weatherSaga