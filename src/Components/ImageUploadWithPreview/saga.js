import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { endLoading, startLoading } from "../../App/rootReducer";
import { deleteImageKitApi, uploadImageKitApi } from "./api";
import { changeUploading, deleteImageFail, deleteImageRequest, deleteImageSuccess, uploadImageFail, uploadImageRequest, uploadImageSuccess } from "./reducer";

function* uploadImageWorker({ payload }) {
    try {
        yield put(startLoading())
        yield put(changeUploading(true))
        const response = yield call(uploadImageKitApi, payload)
        yield put(uploadImageSuccess(response.data))
        toast.success(response.data.message)
    } catch (e) {
        yield put(uploadImageFail())
        toast.error(e?.response?.data?.message || "Upload thất bại")
    } finally {
        yield put(changeUploading(false))
        yield put(endLoading())
    }
}

function* uploadImageWatcher() {
    yield takeLatest(uploadImageRequest, uploadImageWorker)
}

function* deleteImageWorker({ payload }) {
    try {
        yield put(startLoading())
        const response = yield call(deleteImageKitApi, payload)
        yield put(deleteImageSuccess(payload))
        toast.success(response.data.message)
    } catch (e) {
        yield put(deleteImageFail())
        toast.error(e?.response?.data?.message || "Xóa ảnh thất bại")
    } finally {
        yield put(endLoading())
    }
}

function* deleteImageWatcher() {
    yield takeLatest(deleteImageRequest, deleteImageWorker)
}

export default function* uploadImageSaga() {
    yield all([
        uploadImageWatcher(),
        deleteImageWatcher()
    ])
}
