import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { addNewsApi, deleteNewsApi, editNewsApi, getNewsByIdApi, searchNewsApi } from "./api";
import { addNewsFail, addNewsRequest, addNewsSuccess, changeAddSuccess, changeEditSuccess, deleteNewsFail, deleteNewsRequest, deleteNewsSuccess, editNewsFail, editNewsRequest, editNewsSuccess, getListNewsFail, getListNewsRequest, getListNewsSuccess, getNewsByIdFail, getNewsByIdRequest, getNewsByIdSuccess } from "./reducer";

function* addNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(addNewsApi, payload)
        yield put(addNewsSuccess())
        yield put(changeAddSuccess(true))
        toast.success(response.data.message)
    } catch (e) {
        yield put(addNewsFail())
        toast.error(e?.response?.data?.message || "Thêm thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* addNewsWatcher() {
    yield takeLatest(addNewsRequest, addNewsWorker)
}

function* editNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(editNewsApi, payload)
        yield put(editNewsSuccess())
        yield put(changeEditSuccess(true))
        toast.success(response.data.message)
    } catch (e) {
        yield put(editNewsFail())
        toast.error(e?.response?.data?.message || "Sửa thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* editNewsWatcher() {
    yield takeLatest(editNewsRequest, editNewsWorker)
}

function* getListNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(searchNewsApi, payload)
        yield put(getListNewsSuccess(response.data.data))
    } catch (e) {
        yield put(getListNewsFail())
        toast.error(e?.response?.data?.message || "Thêm thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getListNewsWatcher() {
    yield takeLatest(getListNewsRequest, getListNewsWorker)
}


function* deleteNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(deleteNewsApi, payload)
        const { searchTitle, searchDescription, pageNum, pageSize } = yield select(
            state => state.newsManagePage
        );
        yield put(getListNewsRequest({
            title: searchTitle,
            description: searchDescription,
            pageNum,
            pageSize
        }));
        yield put(deleteNewsSuccess())
        toast.success(response.data.message)
    } catch (e) {
        yield put(deleteNewsFail())
        toast.error(e?.response?.data?.message || "Xóa thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* deleteNewsWatcher() {
    yield takeLatest(deleteNewsRequest, deleteNewsWorker)
}

function* getNewsByIdWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getNewsByIdApi, payload)
        yield put(getNewsByIdSuccess(response.data.data))
    } catch (e) {
        yield put(getNewsByIdFail())
        toast.error(e?.response?.data?.message || "Xóa thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getNewsByIdWatcher() {
    yield takeLatest(getNewsByIdRequest, getNewsByIdWorker)
}


export default function* newsSaga() {
    yield all([
        addNewsWatcher(),
        getListNewsWatcher(),
        deleteNewsWatcher(),
        getNewsByIdWatcher(),
        editNewsWatcher()
    ])
}
