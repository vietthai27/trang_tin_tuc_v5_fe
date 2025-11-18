import { all, call, put, takeLatest } from "redux-saga/effects"
import { billSplitApi, getAccountListApi, getListUserApi } from "./api"
import { getAccountListFail, getAccountListSuccess, getUserListFail, getUserListRequest, getUserListSuccess, splitBillFail, splitBillRequest, splitBillSuccess } from "./redux"
import { endLoading, startLoading } from "../../rootReducer"
import { getAccountListRequest } from "../AccountPage/redux"

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

// 💡 NEW WORKER FOR ACCOUNT LIST
function* getAccountListWorker(action) {
    // Action payload is expected to be { receiver: 'Username' }
    const { receiver } = action.payload; 
    try {
        yield put(startLoading());
        // Call the new API with the receiver's name
        const res = yield call(getAccountListApi, receiver); //
        
        // Dispatch success, including both the data and the receiver's name for the reducer
        yield put(getAccountListSuccess({ receiver, data: res.data.data })); //
        
        yield put(endLoading());
    } catch (e) {
        yield put(endLoading());
        yield put(getAccountListFail());
    }
}

// 💡 NEW WATCHER
function* getAccountListWatcher() {
    yield takeLatest(getAccountListRequest, getAccountListWorker);
}


function* splitBillWatcher() {
    yield takeLatest(splitBillRequest, splitBillWorker)
}

function* BillListSaga() {
    yield all([
        getUserListWatcher(),
        splitBillWatcher(),
        getAccountListWatcher()
    ])
}

export default BillListSaga