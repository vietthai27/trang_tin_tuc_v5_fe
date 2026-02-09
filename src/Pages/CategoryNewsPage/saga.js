import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { changeCategoryName, getNewsBySubCategoryFail, getNewsBySubCategoryRequest, getNewsBySubCategorySuccess, getSubCategoryListFail, getSubCategoryListRequest, getSubCategoryListSuccess } from "./reducer";
import { getNewsBySubCategoty, getSubCategoryByIdApi } from "./api";

function* getSubCategoryListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getSubCategoryByIdApi, payload)
        yield put(getSubCategoryListSuccess(response.data.data.data))
        yield put(changeCategoryName(response.data.data.categoryName))
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

function* getNewsBySubCategoryWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getNewsBySubCategoty, payload)
        yield put(getNewsBySubCategorySuccess(response.data.data))
    } catch (e) {
        yield put(getNewsBySubCategoryFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getNewsBySubCategoryWatcher() {
    yield takeLatest(getNewsBySubCategoryRequest, getNewsBySubCategoryWorker)
}

export default function* categoryNewsSaga() {
    yield all([
        getSubCategoryListWatcher(),
        getNewsBySubCategoryWatcher()
    ])
}
