import { all, call, put, takeLatest } from "redux-saga/effects"
import {
    addBankApi,
    deleteBankApi,
    editBankApi,
    getBankByIdApi,
    searchBankListApi
} from "./api"
import {
    addBankFail,
    addBankRequest,
    addBankSuccess,
    deleteBankFail,
    deleteBankRequest,
    deleteBankSuccess,
    editBankFail,
    editBankRequest,
    editBankSuccess,
    getBankByIdFail,
    getBankByIdRequest,
    getBankByIdSuccess,
    getBankListFail,
    getBankListRequest, getBankListSuccess
} from "./redux"
import { endLoading, startLoading } from "../../rootReducer"
import { notify } from "../../ultil"

function* searchBankWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(searchBankListApi, payload)
        yield put(getBankListSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getBankListFail())
    }
}

function* addBankWorker({ payload }) {
    try {
        yield put(startLoading())
        const resAdd = yield call(addBankApi, payload)
        const res = yield call(searchBankListApi, payload.searchParams)
        yield put(addBankSuccess(res.data))
        yield put(endLoading())
        notify(resAdd.data.status, resAdd.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(addBankFail())
    }
}

function* editBankWorker({ payload }) {
    try {
        yield put(startLoading())
        const resEdit = yield call(editBankApi, payload)
        const res = yield call(searchBankListApi, payload.searchParams)
        yield put(editBankSuccess(res.data))
        yield put(endLoading())
        notify(resEdit.data.status, resEdit.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(editBankFail())
    }
}

function* getBankByIdWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getBankByIdApi, payload)
        yield put(getBankByIdSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getBankByIdFail())
    }
}

function* deleteBankWorker({ payload }) {
  try {
    yield put(startLoading());
    const resDelete = yield call(deleteBankApi, payload.id);
    const res = yield call(searchBankListApi, payload.searchParams);
    yield put(deleteBankSuccess(res.data));
    yield put(endLoading());
    notify(resDelete.data.status, resDelete.data.message)
  } catch (e) {
    console.error("Error in deleteBankWorker:", e);
    yield put(endLoading());
    yield put(deleteBankFail());
  }
}


function* searchBankWatcher() {
    yield takeLatest(getBankListRequest, searchBankWorker)
}

function* addBankWatcher() {
    yield takeLatest(addBankRequest, addBankWorker)
}

function* editBankWatcher() {
    yield takeLatest(editBankRequest, editBankWorker)
}

function* deleteBankWatcher() {
    yield takeLatest(deleteBankRequest, deleteBankWorker)
}

function* getBankByIdWatcher() {
    yield takeLatest(getBankByIdRequest, getBankByIdWorker)
}

function* BankListSaga() {
    yield all([
        searchBankWatcher(),
        addBankWatcher(),
        editBankWatcher(),
        deleteBankWatcher(),
        getBankByIdWatcher()
    ])
}

export default BankListSaga