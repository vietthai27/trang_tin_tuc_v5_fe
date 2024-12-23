import { all, call, put, takeLatest } from "redux-saga/effects";
import { endLoading, startLoading } from "../../rootReducer";
import { toast } from "react-toastify";
import { addNewsApi, deleteNewsApi, editNewsApi, getNewsBySubMenuApi, getSubMenuApi, searchNewsApi } from "./api";
import { addNewsFail, addNewsRequest, addNewsSuccess, deleteNewsFail, deleteNewsRequest, deleteNewsSuccess, editNewsFail, editNewsRequest, editNewsSuccess, getNewsBySubMenuFail, getNewsBySubMenuRequeset, getNewsBySubMenuSuccess, getSubMenuFail, getSubMenuRequeset, getSubMenuSuccess, searchNewsFail, searchNewsRequest, searchNewsSuccess } from "./redux";


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

function* getNewsBySubMenuWatcher() {
    yield takeLatest(getNewsBySubMenuRequeset, getNewsBySubMenuWorker)
}

function* getNewsBySubMenuWorker({ payload }) {
    try {
        yield put(startLoading())
        const res = yield call(getNewsBySubMenuApi, payload)
        yield put(getNewsBySubMenuSuccess(res.data))
        yield put(endLoading())
    } catch (e) {
        yield put(endLoading())
        yield put(getNewsBySubMenuFail())
    }
}

function* getSubMenuWatcher() {
    yield takeLatest(getSubMenuRequeset, getSubMenuWorker)
}

function* addNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        yield call(addNewsApi, payload.addParam)
        const res = yield call(searchNewsApi, payload.searchParam)
        yield put(addNewsSuccess(res.data))
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
        yield call(editNewsApi, payload.editParam)
        const res = yield call(searchNewsApi, payload.searchParams)
        yield put(editNewsSuccess(res.data))
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
        editNewsWatcher(),
        getNewsBySubMenuWatcher()
    ])
}

export default newsListSaga