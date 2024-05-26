import menuReducer from './Component/Menu/reducer';
import userLoginReducer from './Component/UserLogin/reducer';
import userManageReducer from './Component/UserManage/reducer';

import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices({
    userManage: userManageReducer,
    menu: menuReducer,
    userLogin: userLoginReducer
})