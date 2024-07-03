import { call, put, takeLatest } from "redux-saga/effects";
import { getMenuDataFail, getMenuDataSuccess } from "./reducer";
import { menuDataApi } from "./api";
import { endLoading, startLoading } from "../../rootReducer";


function* workGetMenuData() {
    try {
        yield put(startLoading())
        const menuData = yield call(menuDataApi) 
        yield put(getMenuDataSuccess(menuData.data.content))  
        yield put(endLoading())  
    } catch (error) {
        yield put(getMenuDataFail)
    }
}

function* menuSaga() {
    yield takeLatest('menu/getMenuData', workGetMenuData)

}

export default menuSaga