import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { changeModerRoleFail, changeModerRoleRequest, changeModerRoleSuccess, getUserListFail, getUserListRequest, getUserListSuccess } from "./reducer";
import { toast } from "react-toastify";
import { changeModerRoleApi, searchUserApi } from "./api";
import { endLoading, startLoading } from "../../App/rootReducer";

function* getUserListWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(searchUserApi, payload)
        yield put(getUserListSuccess(response.data.data))
    } catch (e) {       
        yield put(getUserListFail())
        toast.error(e?.response?.data?.message || "Lấy dữ liệu thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* getUserListWatcher() {
    yield takeLatest(getUserListRequest, getUserListWorker)
}

function* changeModerRoleWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(changeModerRoleApi, payload)
            const { search, pageNum, pageSize } = yield select(
            state => state.userPage
        );

        yield put(
            getUserListRequest({ search, pageNum, pageSize })
        );
        yield put(changeModerRoleSuccess())
        toast.success(response.data.message)
    } catch (e) {       
        yield put(changeModerRoleFail())
        toast.error(e?.response?.data?.message || "Đổi role thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* changeModerRoleWatcher() {
    yield takeLatest(changeModerRoleRequest, changeModerRoleWorker)
}

export default function* userListSaga() {
    yield all([
        getUserListWatcher(),
        changeModerRoleWatcher()
    ])
}
