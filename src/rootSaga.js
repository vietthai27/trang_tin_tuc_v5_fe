import { all } from "redux-saga/effects";

import menuSaga from "./Component/Header/Menu/saga";
import userLoginSaga from "./Component/Header/UserManage/UserLogin/saga";

export default function* rootSaga() {
    yield all([
        menuSaga(),
        userLoginSaga()
    ]);
}