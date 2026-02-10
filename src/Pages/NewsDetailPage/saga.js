import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
    getNewsDetail,
    likeNews,
    unlikeNews,
    getLikeCount,
    getCommentsByNews,
    addComment,
    deleteComment,
    getLikeByUser,
    editComment
} from "./api";
import { startLoading, endLoading } from "../../App/rootReducer";
import {
    getNewsDetailRequest,
    getNewsDetailSuccess,
    getNewsDetailFail,

    likeNewsRequest,
    unlikeNewsRequest,
    setLikeStatus,
    getLikeCountSuccess,

    getCommentsRequest,
    getCommentsSuccess,
    getCommentsFail,

    addCommentRequest,
    deleteCommentRequest,
    editCommentRequest
} from "./reducer";

/* ================= News detail ================= */
function* getNewsDetailWorker({ payload }) {
    try {
        yield put(startLoading());
        const res = yield call(getNewsDetail, payload);
        yield put(getNewsDetailSuccess(res.data.data));
        const resLikeCount = yield call(getLikeCount, payload)
        yield put(getLikeCountSuccess(resLikeCount.data.data))
        const resIsLike = yield call(getLikeByUser, payload)
        yield put(setLikeStatus(resIsLike.data.data))
        const resComment = yield call(getCommentsByNews, payload)
        yield put(getCommentsSuccess(resComment.data.data))
    } catch (e) {
        yield put(getNewsDetailFail());
    } finally {
        yield put(endLoading());
    }
}

/* ================= Like ================= */
function* likeNewsWorker({ payload }) {
    try {
        yield put(startLoading());
        yield call(likeNews, payload);
        yield put(setLikeStatus(true));
        const countRes = yield call(getLikeCount, payload);
        yield put(getLikeCountSuccess(countRes.data.data));
        toast.success("Đã like bài báo");
    } catch {
        toast.error("Like thất bại");
    } finally {
        yield put(endLoading());
    }
}

function* unlikeNewsWorker({ payload }) {
    try {
        yield put(startLoading());
        yield call(unlikeNews, payload);
        yield put(setLikeStatus(false));
        const countRes = yield call(getLikeCount, payload);
        yield put(getLikeCountSuccess(countRes.data.data));
        toast.success("Đã hủy like bài báo");
    } catch {
        toast.error("Hủy like thất bại");
    } finally {
        yield put(endLoading());
    }
}

/* ================= Comment ================= */
function* getCommentsWorker({ payload }) {
    try {
        const res = yield call(getCommentsByNews, payload);
        yield put(getCommentsSuccess(res.data));
    } catch {
        yield put(getCommentsFail());
        toast.error("Không lấy được bình luận");
    }
}

function* addCommentWorker({ payload }) {
    try {
        yield put(startLoading());
        const { newsId, username, content } = payload;
        yield call(addComment, newsId, username, content);
        const resComment = yield call(getCommentsByNews, { id: newsId })
        yield put(getCommentsSuccess(resComment.data.data))
        toast.success("Đã thêm bình luận");
    } catch {
        toast.error("Thêm bình luận thất bại");
    } finally {
        yield put(endLoading());
    }
}

function* editCommentWorker({ payload }) {
    try {
        yield put(startLoading());
        const { commentId, newsId, username, content } = payload;
        yield call(editComment, commentId, newsId, username, content);
        const resComment = yield call(getCommentsByNews, { id: newsId })
        yield put(getCommentsSuccess(resComment.data.data))
        toast.success("Đã sửa bình luận");
    } catch {
        toast.error("Sửa bình luận thất bại");
    } finally {
        yield put(endLoading());
    }
}

function* deleteCommentWorker({ payload }) {
    try {
        yield call(deleteComment, payload.id);
        const resComment = yield call(getCommentsByNews, { id: payload.newsId })
        yield put(getCommentsSuccess(resComment.data.data))
        toast.success("Xóa bình luận thành công");
    } catch {
        toast.error("Xóa bình luận thất bại");
    }
}

/* ================= Watchers ================= */
export default function* newsDetailSaga() {
    yield all([
        takeLatest(getNewsDetailRequest, getNewsDetailWorker),

        takeLatest(likeNewsRequest, likeNewsWorker),
        takeLatest(unlikeNewsRequest, unlikeNewsWorker),

        takeLatest(getCommentsRequest, getCommentsWorker),
        takeLatest(addCommentRequest, addCommentWorker),
        takeLatest(deleteCommentRequest, deleteCommentWorker),
        takeLatest(editCommentRequest, editCommentWorker)
    ]);
}
