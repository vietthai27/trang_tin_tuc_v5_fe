import { stepButtonClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: [],
    uploading: false
}

const uploadImageSlice = createSlice({
    name: 'uploadImage',
    initialState,
    reducers: {
        uploadImageRequest: () => { },
        uploadImageSuccess: (state, action) => {
            state.images = [...state.images, action.payload.data]
        },
        uploadImageFail: () => { },
        deleteImageRequest: () => { },
        deleteImageSuccess: (state, action) => {
            const deletedUrl = action.payload
            state.images = state.images.filter(img => img.url !== deletedUrl)
        },
        deleteImageFail: () => { },
        changeUploading: (state, action) => { state.uploading = action.payload },
        getImagesById: (state, action) => {
            state.images = action.payload
        },
        resetImages: (state) => { state.images = [] }

    }
})

const uploadImageReducer = uploadImageSlice.reducer

export const {
    uploadImageFail,
    uploadImageRequest,
    uploadImageSuccess,
    deleteImageFail,
    deleteImageRequest,
    deleteImageSuccess,
    changeUploading,
    getImagesById,
    resetImages
} = uploadImageSlice.actions

export default uploadImageReducer