import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsDetail: {},
    comments: [],
    likeCount: 0,
    isLiked: false
};

const newsDetailSlice = createSlice({
    name: "newsDetail",
    initialState,
    reducers: {
        /* ===== News detail ===== */
        getNewsDetailRequest: () => {},
        getNewsDetailSuccess: (state, action) => {
            state.newsDetail = action.payload;
        },
        getNewsDetailFail: () => {},

        /* ===== Like ===== */
        likeNewsRequest: () => {},
        unlikeNewsRequest: () => {},

        setLikeStatus: (state, action) => {
            state.isLiked = action.payload;
        },

        getLikeCountSuccess: (state, action) => {
            state.likeCount = action.payload;
        },

        /* ===== Comment ===== */
        getCommentsRequest: () => {},
        getCommentsSuccess: (state, action) => {
            state.comments = action.payload;
        },
        getCommentsFail: () => {},

        addCommentRequest: () => {},
        editCommentRequest: () => {},
        deleteCommentRequest: () => {}
    }
});

export const {
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
    editCommentRequest,
    deleteCommentRequest
} = newsDetailSlice.actions;

export default newsDetailSlice.reducer;
