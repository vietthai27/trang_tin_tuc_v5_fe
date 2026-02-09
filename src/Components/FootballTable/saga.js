import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { getAllLeauge, getTableData } from "./api";
import {
    getAllLeaugeRequest,
    getAllLeaugeSuccess,
    getAllLeaugeFail,
    getTableDataRequest,
    getTableDataSuccess,
    getTableDataFail
} from "./reducer";

function* getAllLeaugeWorker() {
    try {
        yield put(startLoading());
        const response = yield call(getAllLeauge);
        yield put(getAllLeaugeSuccess(response.data.leagues));
    } catch (e) {
        yield put(getAllLeaugeFail());
        toast.error(e?.response?.data?.message || "Failed to get leagues");
    } finally {
        yield put(endLoading());
    }
}

function* getAllLeaugeWatcher() {
    yield takeLatest(getAllLeaugeRequest, getAllLeaugeWorker);
}

function* getTableDataWorker({ payload }) {
    try {
        yield put(startLoading());
        const response = yield call(getTableData, payload);
        yield put(getTableDataSuccess(response.data.table));
    } catch (e) {
        yield put(getTableDataFail());
        toast.error(e?.response?.data?.message || "Failed to get table data");
    } finally {
        yield put(endLoading());
    }
}

function* getTableDataWatcher() {
    yield takeLatest(getTableDataRequest, getTableDataWorker);
}

export default function* footballTableSaga() {
    yield all([
        getAllLeaugeWatcher(),
        getTableDataWatcher()
    ]);
}
