import { all, call, put, takeLatest } from "redux-saga/effects";
import { deleteModerRoleApi, deleteUserApi, searchUserApi, setModerRoleApi } from "./api";
import { setLoading } from "../../rootReducer";
import { deleteModerRoleFail, deleteModerRoleRequest, deleteModerRoleSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess, getAllUserFail, getAllUserRequest, getAllUserSuccess, searchUserFail, searchUserRequest, searchUserSuccess, setModerRoleFail, setModerRoleRequest, setModerRoleSuccess } from "./redux";
import { toast } from "react-toastify";


function* searchUserWorker({ payload }) {
    try {
        yield put(setLoading(true))
        const res = yield call(searchUserApi, payload)
        yield put(searchUserSuccess(res.data))
        yield put(setLoading(false))
    } catch (e) {
        yield put(setLoading(false))
        yield put(searchUserFail())
    }
}

function* searchUserWatcher() {
    yield takeLatest(searchUserRequest, searchUserWorker)
}

function* setUserModerWorker({ payload }) {
    try {
        yield put(setLoading(true))
        yield call(setModerRoleApi, payload.id)
        yield put(setModerRoleSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(setLoading(false))
        toast.success("Đặt quyền MODER thành công")

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
        yield put(deleteModerRoleSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(setLoading(false))
        toast.success("Hủy quyền MODER thành công")

    } catch (e) {
        yield put(setLoading(false))
        yield put(deleteModerRoleFail())
    }
}

function* deleteUserModerWatcher() {
    yield takeLatest(deleteModerRoleRequest.type, deleteUserModerWorker)
}

function* deleteUserWorker({ payload }) {
    try {
        yield put(setLoading(true))
        yield call(deleteUserApi, payload.id)
        yield put(deleteUserSuccess())
        const res = yield call(searchUserApi, {
            search: payload.search,
            pageNum: payload.pageNum,
            pageSize: payload.pageSize
        })
        yield put(getAllUserSuccess(res.data))
        yield put(setLoading(false))
        toast.success("Xóa người dùng thành công")
    } catch (e) {
        yield put(setLoading(false))
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