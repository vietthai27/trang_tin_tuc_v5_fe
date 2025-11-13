import { all, call, put, takeLatest } from "redux-saga/effects"
import { addAccountApi, deleteAccountApi, editAccountApi, getAccountById, getAccountByUsernameApi, getAllBanksApi } from "./api"
import { addAccountFail, addAccountRequest, addAccountSuccess, deleteAccountFail, deleteAccountRequest, deleteAccountSuccess, editAccountFail, editAccountRequest, editAccountSuccess, getAccountByIdFail, getAccountByIdRequest, getAccountByIdSuccess, getAccountListFail, getAccountListRequest, getAccountListSuccess, getBankListFail, getBankListRequest, getBankListSuccess } from "./redux"
import { endLoading, startLoading } from "../../rootReducer"
import { notify } from "../../ultil"

function* getAccountWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getAccountByUsernameApi, payload)
        yield put(getAccountListSuccess(res.data.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getAccountListFail())
    }
}

function* addAccountWorker({ payload }) {
    try {
        yield put(startLoading())
        const resSet = yield call(addAccountApi, payload)
        const res = yield call(getAccountByUsernameApi, payload.username)
        yield put(addAccountSuccess(res.data))
        yield put(endLoading())
        notify(resSet.data.status, resSet.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(addAccountFail())
    }
}

function* getAllBankWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getAllBanksApi, payload)
        yield put(getBankListSuccess(res.data.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getBankListFail())
    }
}

function* editAccountWorker({ payload }) {
    try {
        yield put(startLoading())
        const resSet = yield call(editAccountApi, payload)
        const res = yield call(getAccountByUsernameApi, payload.username)
        yield put(editAccountSuccess(res.data))
        yield put(endLoading())
        notify(resSet.data.status, resSet.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(editAccountFail())
    }
}

function* getAccountByIdWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getAccountById, payload)
        yield put(getAccountByIdSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getAccountByIdFail())
    }
}

function* deleteAccountWorker({ payload }) {
    try {
        yield put(startLoading());
        const resSet = yield call(deleteAccountApi, payload.id);
        const res = yield call(getAccountByUsernameApi, payload.username)
        yield put(deleteAccountSuccess(res.data));
        yield put(endLoading());
        notify(resSet.data.status, resSet.data.message)
    } catch (e) {
        yield put(endLoading());
        yield put(deleteAccountFail());
    }
}

function* getAccountWatcher() {
    yield takeLatest(getAccountListRequest, getAccountWorker)
}

function* addAccountWatcher() {
    yield takeLatest(addAccountRequest, addAccountWorker)
}

function* editAccountWatcher() {
    yield takeLatest(editAccountRequest, editAccountWorker)
}

function* deleteAccountWatcher() {
    yield takeLatest(deleteAccountRequest, deleteAccountWorker)
}

function* getAccountByIdWatcher() {
    yield takeLatest(getAccountByIdRequest, getAccountByIdWorker)
}

function* getBankListWatcher() {
    yield takeLatest(getBankListRequest, getAllBankWorker)
}

function* AccountListSaga() {
    yield all([
        getAccountWatcher(),
        addAccountWatcher(),
        deleteAccountWatcher(),
        getBankListWatcher(),
        editAccountWatcher(),
        getAccountByIdWatcher()
    ])
}

export default AccountListSaga