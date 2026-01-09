import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { addManagementApi, deleteManagementApi, editManagementApi, getAllRoleApi, getManagementByIdApi, searchManagementApi } from "./api";
import { addManagementFail, addManagementRequest, addManagementSuccess, closeModalAdd, closeModalEdit, deleteManagementFail, deleteManagementRequest, deleteManagementSuccess, editManagementFail, editManagementRequest, editManagementSuccess, getIdManagementFail, getIdManagementRequest, getIdManagementSuccess, getManagementListFail, getManagementListRequest, getManagementListSuccess, getRoleListFail, getRoleListRequest, getRoleListSuccess, openModalEdit } from "./reducer";

function* getManagementListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(searchManagementApi, payload)
        yield put(getManagementListSuccess(response.data.data))
    } catch (e) {
        yield put(getManagementListFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getManagementListWatcher() {
    yield takeLatest(getManagementListRequest, getManagementListWorker)
}

function* getRoleListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getAllRoleApi, payload)
        yield put(getRoleListSuccess(response.data.data))
    } catch (e) {
        yield put(getRoleListFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getRoleListWatcher() {
    yield takeLatest(getRoleListRequest, getRoleListWorker)
}

function* addManagementWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(addManagementApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.managementPage
        );
        yield put(
            getManagementListRequest({ search, pageNum, pageSize })
        );
        yield put(addManagementSuccess())
        yield put(closeModalAdd())
        toast.success(response.data.message)
    } catch (e) {
        yield put(addManagementFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* addManagementWatcher() {
    yield takeLatest(addManagementRequest, addManagementWorker)
}

function* editManagementWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(editManagementApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.managementPage
        );
        yield put(
            getManagementListRequest({ search, pageNum, pageSize })
        );
        yield put(editManagementSuccess())
        yield put(closeModalEdit())
        toast.success(response.data.message)
    } catch (e) {
        yield put(editManagementFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* editManagementWatcher() {
    yield takeLatest(editManagementRequest, editManagementWorker)
}

function* deleteManagementWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(deleteManagementApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.managementPage
        );
        yield put(
            getManagementListRequest({ search, pageNum, pageSize })
        );
        yield put(deleteManagementSuccess())
        toast.success(response.data.message)
    } catch (e) {
        yield put(deleteManagementFail())
        toast.error(e?.response?.data?.message || "Xóa dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* deleteManagementWatcher() {
    yield takeLatest(deleteManagementRequest, deleteManagementWorker)
}

function* getIdManagementWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getManagementByIdApi, payload)
        yield put(getIdManagementSuccess(response.data.data))
        yield put(openModalEdit())
    } catch (e) {
        yield put(getIdManagementFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getIdManagementWatcher() {
    yield takeLatest(getIdManagementRequest, getIdManagementWorker)
}

export default function* userListSaga() {
    yield all([
        getManagementListWatcher(),
        getRoleListWatcher(),
        addManagementWatcher(),
        getIdManagementWatcher(),
        editManagementWatcher(),
        deleteManagementWatcher()
    ])
}
