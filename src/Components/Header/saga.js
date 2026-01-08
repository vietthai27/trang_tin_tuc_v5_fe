import { call, put, takeLatest, all } from "redux-saga/effects";
import { categoryDataApi, managementDataApi } from "./api";
import {
    getCategoryDataFail,
    getCategoryDataRequest,
    getCategoryDataSuccess,
    getManagementDataFail,
    getManagementDataRequest,
    getManagementDataSuccess
} from "./reducer";
import { endLoading, startLoading } from "../../App/rootReducer";

function* workGetManagementData({ payload }) {
    try {
        yield put(startLoading())
        const managementData = yield call(managementDataApi, payload)
        yield put(getManagementDataSuccess(managementData.data.data))
    } catch (error) {
        yield put(getManagementDataFail())
    } finally {
        yield put(endLoading())
    }
}

function* getManagementDataWatcher() {
    yield takeLatest(getManagementDataRequest.type, workGetManagementData)
}

function* workGetCategoryData() {
    try {
        yield put(startLoading())
        const categoryData = yield call(categoryDataApi)  
        yield put(getCategoryDataSuccess(categoryData.data.data))
    } catch (error) {
        yield put(getCategoryDataFail())
    } finally {
        yield put(endLoading())
    }
}

function* getCategoryDataWatcher() {
    yield takeLatest(getCategoryDataRequest.type, workGetCategoryData)
}

export default function* headerSaga() {
    yield all([
        getCategoryDataWatcher(),
        getManagementDataWatcher()
    ])
}
