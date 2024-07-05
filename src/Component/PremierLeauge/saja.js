import { all, call, put, takeLatest } from "redux-saga/effects"
import { endLoading, startLoading } from "../../rootReducer"
import { getPremierLeaugeTableApi } from "./api"
import { getPremierLeaugeTableRequest, getPremierLeaugeTableSuccess } from "./redux"

function* workGetTableData({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getPremierLeaugeTableApi, payload)
        yield put(getPremierLeaugeTableSuccess(response))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
    }
}

function* watchGetTableData() {
    yield takeLatest(getPremierLeaugeTableRequest, workGetTableData)
}

function* premierLeaugeSaga() {
    yield all([
        watchGetTableData()
    ])
}

export default premierLeaugeSaga