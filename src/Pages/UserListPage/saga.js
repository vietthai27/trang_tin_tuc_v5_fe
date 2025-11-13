import { all, call, put, takeLatest } from "redux-saga/effects";
import { deleteModerRoleApi, deleteUserApi, searchUserApi, setModerRoleApi } from "./api";
import { endLoading, startLoading } from "../../rootReducer";
import { deleteModerRoleFail, deleteModerRoleRequest, deleteModerRoleSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess, getAllUserSuccess, searchUserFail, searchUserRequest, searchUserSuccess, setModerRoleFail, setModerRoleRequest, setModerRoleSuccess } from "./redux";
import { notify } from "../../ultil";


function* searchUserWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(searchUserApi, payload)
        yield put(searchUserSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(searchUserFail())
    }
}

function* searchUserWatcher() {
    yield takeLatest(searchUserRequest, searchUserWorker)
}

function* setUserModerWorker({ payload }) {
    try {
        yield put(startLoading())
        const resSet = yield call(setModerRoleApi, payload.id)
        yield put(setModerRoleSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(endLoading())
        notify(resSet.data.status, resSet.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(setModerRoleFail())
    }
}

function* setUserModerWatcher() {
    yield takeLatest(setModerRoleRequest.type, setUserModerWorker)
}

function* deleteUserModerWorker({ payload }) {
    try {
        yield put(startLoading())
        const resSet = yield call(deleteModerRoleApi, payload.id)
        yield put(deleteModerRoleSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(endLoading())
        notify(resSet.data.status, resSet.data.message)

    } catch (e) {
        yield put(endLoading())
        yield put(deleteModerRoleFail())
    }
}

function* deleteUserModerWatcher() {
    yield takeLatest(deleteModerRoleRequest.type, deleteUserModerWorker)
}

function* deleteUserWorker({ payload }) {
    try {
        yield put(startLoading())
        const resSet = yield call(deleteUserApi, payload.id)
        yield put(deleteUserSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(endLoading())
        notify(resSet.data.status, resSet.data.message)
    } catch (e) {
        yield put(endLoading())
        yield put(deleteUserFail())
    }
}

function* deleteUserWatcher() {
    yield takeLatest(deleteUserRequest.type, deleteUserWorker)
}

function* userListSaga() {
    yield all([
        setUserModerWatcher(),
        deleteUserModerWatcher(),
        searchUserWatcher(),
        deleteUserWatcher()
    ])
}

export default userListSaga