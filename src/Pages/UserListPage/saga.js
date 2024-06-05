import { all, call, put, takeLatest } from "redux-saga/effects";
import { deleteModerRoleApi, getAllUserApi, setModerRoleApi } from "./api";
import { setLoading } from "../../rootReducer";
import { deleteModerRoleFail, deleteModerRoleRequest, deleteModerRoleSuccess, getAllUserFail, getAllUserRequest, getAllUserSuccess, setModerRoleFail, setModerRoleRequest, setModerRoleSuccess } from "./redux";

function* getAllUserWorker({ payload }) {
    try {
        yield put(setLoading(true))
        const res = yield call(getAllUserApi, payload)
        yield put(setLoading(false))
        yield put(getAllUserSuccess(res.data))
    } catch (e) {
        yield put(setLoading(false))
        yield put(getAllUserFail())
    }
}

function* getAllUserWatcher() {
    yield takeLatest(getAllUserRequest, getAllUserWorker)
}

function* setUserModerWorker({ payload }) {
    try {
        yield put(setLoading(true))
        yield call(setModerRoleApi, payload.id)
         const res = yield call(getAllUserApi, {
            pageNum:payload.pageNum,
            pageSize:payload.pageSize
        })
        yield put(setLoading(false))
        yield put(getAllUserSuccess(res.data))
    } catch (e) {
        yield put(setLoading(false))
        yield put(setModerRoleFail())
    }
}

function* setUserModerWatcher() {
    yield takeLatest(setModerRoleRequest.type, setUserModerWorker)
}

function* deleteUserModerWorker({ payload }) {
    try {
        yield put(setLoading(true))
        yield call(deleteModerRoleApi, payload.id)
        const res = yield call(getAllUserApi, {
            pageNum:payload.pageNum,
            pageSize:payload.pageSize
        })
        yield put(setLoading(false))
        yield put(getAllUserSuccess(res.data))
    } catch (e) {
        yield put(setLoading(false))
        yield put(deleteModerRoleFail())
    }
}

function* deleteUserModerWatcher() {
    yield takeLatest(deleteModerRoleRequest.type, deleteUserModerWorker)
}

function* userListSaga() {
    yield all([
        getAllUserWatcher(),
        setUserModerWatcher(),
        deleteUserModerWatcher()
    ])
}

export default userListSaga