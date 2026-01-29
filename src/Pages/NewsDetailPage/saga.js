import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { getNewsDetail } from "./api";
import { endLoading, startLoading } from "../../App/rootReducer";
import { getNewsDetailFail, getNewsDetailRequest, getNewsDetailSuccess } from "./reducer";

function* getNewsDetailWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(getNewsDetail, payload)
        yield put(getNewsDetailSuccess(response.data.data))
    } catch (e) {
        yield put(getNewsDetailFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {        
        yield put(endLoading())
    }
}

function* getNewsDetailWatcher() {
    yield takeLatest(getNewsDetailRequest, getNewsDetailWorker)
}

export default function* getNewsDetailSaga() {
    yield all([
        getNewsDetailWatcher()
    ])
}
