import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { addCategoryApi, deleteCategoryApi, editCategoryApi, getCategoryByIdApi, searchCategoryApi } from "./api";
import { addCategoryFail, addCategoryRequest, addCategorySuccess, closeModalAdd, closeModalEdit, deleteCategoryFail, deleteCategoryRequest, deleteCategorySuccess, editCategoryFail, editCategoryRequest, editCategorySuccess, getIdCategoryFail, getIdCategoryRequest, getIdCategorySuccess, getCategoryListFail, getCategoryListRequest, getCategoryListSuccess, openModalEdit } from "./reducer";

function* getCategoryListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(searchCategoryApi, payload)
        yield put(getCategoryListSuccess(response.data.data))
    } catch (e) {
        yield put(getCategoryListFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getCategoryListWatcher() {
    yield takeLatest(getCategoryListRequest, getCategoryListWorker)
}

function* addCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(addCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.categoryPage
        );
        yield put(
            getCategoryListRequest({ search, pageNum, pageSize })
        );
        yield put(addCategorySuccess())
        yield put(closeModalAdd())
        toast.success(response.data.message)
    } catch (e) {
        yield put(addCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* addCategoryWatcher() {
    yield takeLatest(addCategoryRequest, addCategoryWorker)
}

function* editCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(editCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.categoryPage
        );
        yield put(
            getCategoryListRequest({ search, pageNum, pageSize })
        );
        yield put(editCategorySuccess())
        yield put(closeModalEdit())
        toast.success(response.data.message)
    } catch (e) {
        yield put(editCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* editCategoryWatcher() {
    yield takeLatest(editCategoryRequest, editCategoryWorker)
}

function* deleteCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(deleteCategoryApi, payload)
        const { search, pageNum, pageSize } = yield select(
            state => state.categoryPage
        );
        yield put(
            getCategoryListRequest({ search, pageNum, pageSize })
        );
        yield put(deleteCategorySuccess())
        toast.success(response.data.message)
    } catch (e) {
        yield put(deleteCategoryFail())
        toast.error(e?.response?.data?.message || "Xóa dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* deleteCategoryWatcher() {
    yield takeLatest(deleteCategoryRequest, deleteCategoryWorker)
}

function* getIdCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getCategoryByIdApi, payload)
        yield put(getIdCategorySuccess(response.data.data))
        yield put(openModalEdit())
    } catch (e) {
        yield put(getIdCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getIdCategoryWatcher() {
    yield takeLatest(getIdCategoryRequest, getIdCategoryWorker)
}


export default function* categorySaga() {
    yield all([
        getCategoryListWatcher(),
        addCategoryWatcher(),
        getIdCategoryWatcher(),
        editCategoryWatcher(),
        deleteCategoryWatcher(),
    ])
}
