import { all, call, put, takeLatest } from "redux-saga/effects";
import { endLoading, startLoading } from "../../rootReducer";
import { toast } from "react-toastify";
import { addNewsApi, deleteNewsApi, editNewsApi, getSubMenuApi, searchNewsApi } from "./api";
import { addNewsFail, addNewsRequest, addNewsSuccess, deleteNewsFail, deleteNewsRequest, deleteNewsSuccess, editNewsFail, editNewsRequest, editNewsSuccess, getSubMenuFail, getSubMenuRequeset, getSubMenuSuccess, searchNewsFail, searchNewsRequest, searchNewsSuccess } from "./redux";


function* searchNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(searchNewsApi, payload)
        yield put(searchNewsSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(searchNewsFail())
    }
}

function* searchNewsWatcher() {
    yield takeLatest(searchNewsRequest, searchNewsWorker)
}

function* getSubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getSubMenuApi, payload)
        yield put(getSubMenuSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getSubMenuFail())
    }
}

function* getSubMenuWatcher() {
    yield takeLatest(getSubMenuRequeset, getSubMenuWorker)
}

function* addNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(addNewsApi, payload)
        yield put(addNewsSuccess())
        yield put(endLoading())
        toast.success("Thêm bài báo thành công")

    } catch (e) {
        yield put(endLoading())
        yield put(addNewsFail())
    }
}

function* addNewsWatcher() {
    yield takeLatest(addNewsRequest, addNewsWorker)
}

function* editNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(editNewsApi, payload)
        yield put(editNewsSuccess())
        yield put(endLoading())
        toast.success("Sửa bài báo thành công")

    } catch (e) {
        yield put(endLoading())
        yield put(editNewsFail())
    }
}

function* editNewsWatcher() {
    yield takeLatest(editNewsRequest, editNewsWorker)
}

function* deleteNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(deleteNewsApi, payload.id)
        const res = yield call(searchNewsApi, payload)
        yield put(searchNewsSuccess(res.data))
        yield put(deleteNewsSuccess())
        yield put(endLoading())
        toast.success("Xóa bài báo thành công")

    } catch (e) {
        yield put(endLoading())
        yield put(deleteNewsFail())
    }
}

function* deleteNewsWatcher() {
    yield takeLatest(deleteNewsRequest, deleteNewsWorker)
}

function* newsListSaga() {
    yield all([
        deleteNewsWatcher(),
        searchNewsWatcher(),
        getSubMenuWatcher(),
        addNewsWatcher(),
        editNewsWatcher()
    ])
}

export default newsListSaga