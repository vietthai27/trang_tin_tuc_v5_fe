import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { changeCategoryName, getSubCategoryListFail, getSubCategoryListRequest, getSubCategoryListSuccess } from "./reducer";
import { getSubCategoryByIdApi } from "./api";

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


export default function* categoryNewsSaga() {
    yield all([
        getSubCategoryListWatcher()
    ])
}
