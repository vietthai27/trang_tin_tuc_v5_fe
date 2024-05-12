import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./Constant";
import { menuDataFetch } from "./Api";
import { getMenuDataFail, getMenuDataSuccess } from "./Action";

function* workGetMenuData() {
    try {
        const menuData = yield call(menuDataFetch)
        yield put(getMenuDataSuccess(menuData))
    } catch (error) {
        yield put(getMenuDataFail(error))
    }
}

function* menuSaga() {
    yield takeLatest(types.GET_MENU_DATA, workGetMenuData)

}

export default menuSaga