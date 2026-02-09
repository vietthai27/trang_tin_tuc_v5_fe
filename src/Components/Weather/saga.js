import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { getWeatherData } from "./api";
import {
    getWeatherDataRequest,
    getWeatherDataSuccess,
    getWeatherDataFail
} from "./reducer";

function* getWeatherDataWorker({ payload }) {
    try {
        yield put(startLoading());
        const response = yield call(getWeatherData, payload);
        yield put(getWeatherDataSuccess(response.data));
    } catch (e) {
        yield put(getWeatherDataFail());
        toast.error(e?.response?.data?.message || "Failed to get weather data");
    } finally {
        yield put(endLoading());
    }
}

function* getWeatherDataWatcher() {
    yield takeLatest(getWeatherDataRequest, getWeatherDataWorker);
}

export default function* weatherSaga() {
    yield all([
        getWeatherDataWatcher()
    ]);
}
