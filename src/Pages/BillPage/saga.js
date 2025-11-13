import { all, call, put, takeLatest } from "redux-saga/effects"
import { billSplitApi, getListUserApi } from "./api"
import { getUserListFail, getUserListRequest, getUserListSuccess, splitBillFail, splitBillRequest, splitBillSuccess } from "./redux"
import { endLoading, startLoading } from "../../rootReducer"

function* getUserListWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getListUserApi, payload)
        yield put(getUserListSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getUserListFail())
    }
}

function* getUserListWatcher() {
    yield takeLatest(getUserListRequest, getUserListWorker)
}

function* splitBillWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(billSplitApi, payload)      
        yield put(splitBillSuccess(res.data.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(splitBillFail())
    }
}

function* splitBillWatcher() {
    yield takeLatest(splitBillRequest, splitBillWorker)
}

function* BillListSaga() {
    yield all([
        getUserListWatcher(),
        splitBillWatcher()
    ])
}

export default BillListSaga