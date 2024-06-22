import { all, call, put, takeLatest } from "redux-saga/effects"
import { getMenuDataFail } from "../../Component/Menu/reducer"
import { addMenuListApi, deleteMenuListApi, editMenuListApi, searchMenuListApi } from "./api"
import { addMenuListFail, addMenuListRequest, addMenuListSuccess, deleteMenuListFail, deleteMenuListRequest, deleteMenuListSuccess, editMenuListFail, editMenuListRequest, editMenuListSuccess, getMenuListRequest, getMenuListSuccess } from "./redux"
import { endLoading, startLoading } from "../../rootReducer"
import { toast } from "react-toastify"

function* searchMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(searchMenuListApi, payload)
        yield put(getMenuListSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getMenuDataFail())
    }
}

function* searchMenuWatcher() {
    yield takeLatest(getMenuListRequest, searchMenuWorker)
}

function* addMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(addMenuListApi, payload)
        yield put(addMenuListSuccess())
        const res = yield call(searchMenuListApi, payload)
        yield put(getMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Thêm danh mục thành công')
    } catch (e) {
        yield put(endLoading())
        yield put(addMenuListFail())
    }
}

function* addMenuWatcher() {
    yield takeLatest(addMenuListRequest, addMenuWorker)
}

function* editMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(editMenuListApi, payload)
        yield put(editMenuListSuccess())
        const res = yield call(searchMenuListApi, payload)
        yield put(getMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Sửa danh mục thành công')
    } catch (e) {
        yield put(endLoading())
        yield put(editMenuListFail())
    }
}

function* editMenuWatcher() {
    yield takeLatest(editMenuListRequest, editMenuWorker)
}

function* deleteMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(deleteMenuListApi, payload.id)
        yield put(deleteMenuListSuccess())
        const res = yield call(searchMenuListApi, payload)
        yield put(getMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Xóa danh mục thành công')
    } catch (e) {
        yield put(endLoading())
        toast.warn(e.response.data.message);
        yield put(deleteMenuListFail())
    }
}

function* deleteMenuWatcher() {
    yield takeLatest(deleteMenuListRequest, deleteMenuWorker)
}

function* menuListSaga() {
    yield all([
        searchMenuWatcher(),
        addMenuWatcher(),
        editMenuWatcher(),
        deleteMenuWatcher()
    ])
}

export default menuListSaga