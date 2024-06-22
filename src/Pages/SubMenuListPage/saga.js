import { all, call, put, takeLatest } from "redux-saga/effects"
import { endLoading, startLoading } from "../../rootReducer"
import { toast } from "react-toastify"
import { addSubMenuListApi, deleteSubMenuListApi, editSubMenuListApi, searchSubMenuListApi } from "./api"
import { addSubMenuListFail, addSubMenuListRequest, addSubMenuListSuccess, deleteSubMenuListFail, deleteSubMenuListRequest, deleteSubMenuListSuccess, editSubMenuListFail, editSubMenuListRequest, editSubMenuListSuccess, getSubMenuListFail, getSubMenuListRequest, getSubMenuListSuccess } from "./redux"

function* searchSubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(searchSubMenuListApi, payload)
        yield put(getSubMenuListSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getSubMenuListFail())
    }
}

function* searchSubMenuWatcher() {
    yield takeLatest(getSubMenuListRequest, searchSubMenuWorker)
}

function* addSubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(addSubMenuListApi, payload)
        yield put(addSubMenuListSuccess())
        const res = yield call(searchSubMenuListApi, payload)
        yield put(getSubMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Thêm danh mục con thành công')
    } catch (e) {
        yield put(endLoading())
        yield put(addSubMenuListFail())
    }
}

function* addSubMenuWatcher() {
    yield takeLatest(addSubMenuListRequest, addSubMenuWorker)
}

function* editSubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(editSubMenuListApi, payload)
        yield put(editSubMenuListSuccess())
        const res = yield call(searchSubMenuListApi, payload)
        yield put(getSubMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Sửa danh mục con thành công')
    } catch (e) {
        yield put(endLoading())
        yield put(editSubMenuListFail())
    }
}

function* editSubMenuWatcher() {
    yield takeLatest(editSubMenuListRequest, editSubMenuWorker)
}

function* deleteSubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(deleteSubMenuListApi, payload.id)
        yield put(deleteSubMenuListSuccess())
        const res = yield call(searchSubMenuListApi, payload)
        yield put(getSubMenuListSuccess(res.data))
        yield put(endLoading())
        toast.success('Xóa danh mục con thành công')
    } catch (e) {
        yield put(endLoading())
        toast.warn(e.response.data.message);
        yield put(deleteSubMenuListFail())
    }
}

function* deleteSubMenuWatcher() {
    yield takeLatest(deleteSubMenuListRequest, deleteSubMenuWorker)
}

function* subMenuListSaga() {
    yield all([
        searchSubMenuWatcher(),
        addSubMenuWatcher(),
        editSubMenuWatcher(),
        deleteSubMenuWatcher()
    ])
}

export default subMenuListSaga