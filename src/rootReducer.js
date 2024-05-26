
import menuReducer from './Component/Header/Menu/reducer';
import userLoginReducer from './Component/Header/UserManage/UserLogin/reducer';
import userManageReducer from './Component/Header/UserManage/reducer';

import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices({
    userManage: userManageReducer,
    menu: menuReducer,
    userLogin: userLoginReducer
})