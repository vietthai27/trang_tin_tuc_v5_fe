import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { getMenuDataFail, getMenuDataSuccess } from "./reducer";
import { menuDataApi } from "./api";
import { setLoading } from "../../rootReducer";


function* workGetMenuData() {
    try {
        yield put(setLoading(true))
        const menuData = yield call(menuDataApi)
        yield put(setLoading(false))
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