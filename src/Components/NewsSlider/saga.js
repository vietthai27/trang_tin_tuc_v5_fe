import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { getLatestNews } from "./api";
import { getListLatestNewsFail, getListLatestNewsRequest, getListLatestNewsSuccess } from "./reducer";

function* getLatestNewsWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getLatestNews, payload)
        yield put(getListLatestNewsSuccess(response.data.data))
    } catch (e) {
        yield put(getListLatestNewsFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {        
        yield put(endLoading())
    }
}

function* getLatestNewsWatcher() {
    yield takeLatest(getListLatestNewsRequest, getLatestNewsWorker)
}

export default function* getLatestNewsSaga() {
    yield all([
        getLatestNewsWatcher()
    ])
}
