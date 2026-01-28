import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { addSubCategoryApi, deleteSubCategoryApi, editSubCategoryApi, getSubCategoryByIdApi, searchSubCategoryApi } from "./api";
import { addSubCategoryFail, addSubCategoryRequest, addSubCategorySuccess, closeModalAdd, closeModalEdit, deleteSubCategoryFail, deleteSubCategoryRequest, deleteSubCategorySuccess, editSubCategoryFail, editSubCategoryRequest, editSubCategorySuccess, getIdSubCategoryFail, getIdSubCategoryRequest, getIdSubCategorySuccess, getSubCategoryListFail, getSubCategoryListRequest, getSubCategoryListSuccess, openModalEdit } from "./reducer";

function* getSubCategoryListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(searchSubCategoryApi, payload)
        yield put(getSubCategoryListSuccess(response.data.data))
    } catch (e) {
        yield put(getSubCategoryListFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getSubCategoryListWatcher() {
    yield takeLatest(getSubCategoryListRequest, getSubCategoryListWorker)
}

function* addSubCategoryWorker({ payload }) {
    try {   
        yield put(startLoading())
        const response = yield call(addSubCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.subCategoryPage
        );
        yield put(
            getSubCategoryListRequest({ search, pageNum, pageSize, id: payload.listParams.id })
        );
        yield put(addSubCategorySuccess())
        yield put(closeModalAdd())
        toast.success(response.data.message)
    } catch (e) {
        yield put(addSubCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* addSubCategoryWatcher() {
    yield takeLatest(addSubCategoryRequest, addSubCategoryWorker)
}

function* editSubCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(editSubCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.subCategoryPage
        );
        yield put(
            getSubCategoryListRequest({ search, pageNum, pageSize, id: payload.listParams.id })
        );
        yield put(editSubCategorySuccess())
        yield put(closeModalEdit())
        toast.success(response.data.message)
    } catch (e) {
        yield put(editSubCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* editSubCategoryWatcher() {
    yield takeLatest(editSubCategoryRequest, editSubCategoryWorker)
}

function* deleteSubCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(deleteSubCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.subCategoryPage
        );
        yield put(
            getSubCategoryListRequest({ search, pageNum, pageSize, id: payload.categoryId })
        );
        yield put(deleteSubCategorySuccess())
        toast.success(response.data.message)
    } catch (e) {
        yield put(deleteSubCategoryFail())
        toast.error(e?.response?.data?.message || "Xóa dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* deleteSubCategoryWatcher() {
    yield takeLatest(deleteSubCategoryRequest, deleteSubCategoryWorker)
}

function* getIdSubCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getSubCategoryByIdApi, payload)
        yield put(getIdSubCategorySuccess(response.data.data))
        yield put(openModalEdit())
    } catch (e) {
        yield put(getIdSubCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getIdSubCategoryWatcher() {
    yield takeLatest(getIdSubCategoryRequest, getIdSubCategoryWorker)
}


export default function* subCategorySaga() {
    yield all([
        getSubCategoryListWatcher(),
        addSubCategoryWatcher(),
        getIdSubCategoryWatcher(),
        editSubCategoryWatcher(),
        deleteSubCategoryWatcher(),
        getIdSubCategoryWatcher()
    ])
}
