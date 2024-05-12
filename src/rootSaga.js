import { all, fork } from "redux-saga/effects";
import menuSaga from "./Component/Header/Menu/Saga";
import userSaga from "./Component/Header/UserManage/UserLogin/saga";

export default function* rootSaga() {
    yield all([
        fork(menuSaga),
        fork(userSaga)
    ]);
}