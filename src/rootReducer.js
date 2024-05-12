import { combineReducers } from "redux";
import menuReducer from "./Component/Header/Menu/Reducer";
import userManageReducer from "./Component/Header/UserManage/reducer";
import userReducer from "./Component/Header/UserManage/UserLogin/reducer";

export const rootReducer = combineReducers({ menuReducer, userManageReducer, userReducer })