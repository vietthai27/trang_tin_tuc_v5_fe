import * as types from "./Constant";

export const getMenuData = () => ({
    type: types.GET_MENU_DATA
})
export const getMenuDataSuccess = (danhMucBaiBao) => ({
    type: types.GET_MENU_DATA_SUCCESS,
    payload: danhMucBaiBao
})
export const getMenuDataFail = (error) => ({
    type: types.GET_MENU_DATA_FAIL,
    paload: error
})