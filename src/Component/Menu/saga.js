import { call, put, takeLatest } from "redux-saga/effects";
import { getMenuDataFail, getMenuDataSuccess } from "./reducer";
import { menuDataApi } from "./api";
import { setLoading } from "../../rootReducer";


function* workGetMenuData() {
    try {
        yield put(setLoading(true))
        const menuData = yield call(menuDataApi)   
        yield put(getMenuDataSuccess(menuData))  
        yield put(setLoading(false))  
    } catch (error) {
        yield put(getMenuDataFail)
    }
}

function* menuSaga() {
    yield takeLatest('menu/getMenuData', workGetMenuData)

}

export default menuSaga