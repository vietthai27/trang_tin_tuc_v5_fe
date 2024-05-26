import { all } from "redux-saga/effects";
import menuSaga from "./Component/Menu/saga";
import userLoginSaga from "./Component/UserLogin/saga";



export default function* rootSaga() {
    yield all([
        menuSaga(),
        userLoginSaga()
    ]);
}