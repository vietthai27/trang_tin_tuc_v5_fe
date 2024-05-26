import { call, put, takeLatest } from "redux-saga/effects";
import { menuDataFetch } from "./api";

import { toast } from "react-toastify";
import { getMenuDataFail, getMenuDataSuccess } from "./reducer";


function* workGetMenuData() {
    try {
        const menuData = yield call(menuDataFetch)
        yield put(getMenuDataSuccess(menuData))
    } catch (error) {
        toast.error("Lỗi kết nối đến server !!!")
        yield put(getMenuDataFail)
    }
}

function* menuSaga() {
    yield takeLatest('menu/getMenuData', workGetMenuData)

}

export default menuSaga