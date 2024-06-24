import { createSlice } from "@reduxjs/toolkit"
import { changeTenBaiBao } from "../NewsListPage/redux"

const initialState = {
    newsDetail:{
        danhMucChaId:0,

        danhMucConId:0,

        id:0,
 
        noiDung:'',
         
        tacGia:'',
         
        tenBaiBao:'',
        

        
        thumbnail:'',
         
        tieuDe:'',
       
    }
}


const newsDetailSlice = createSlice({
    name: "newsDetail",
    initialState,
    reducers: {
        newsDetailRequest:() => {

        },
        newsDetailSuccess:(state, action) => {
            state.newsDetail = action.payload
        },
        newsDetailFail:() => {

        },
        changeTenBaiBaoEdit:(state, action) => {
            state.newsDetail.tenBaiBao = action.payload
        },
        changeThumbnailEdit:(state, action) => {
            state.newsDetail.thumbnail = action.payload
        },
        changeNoiDungEdit:(state,action) => {
            state.newsDetail.noiDung = action.payload
        },
        changeTieuDeEdit:(state, action) => {
            state.newsDetail.tieuDe = action.payload
        },
        changIdChaEdit:(state, action) => {
            state.newsDetail.danhMucChaId = action.payload
        },
        changeIdConEdit:(state, action) => {
            state.newsDetail.danhMucConId = action.payload
        }
    }
})

export const {
  newsDetailFail,
  newsDetailRequest,
  newsDetailSuccess,
  changeTenBaiBaoEdit,
  changeNoiDungEdit,
  changeThumbnailEdit,
  changeTieuDeEdit,
  changIdChaEdit,
  changeIdConEdit
} = newsDetailSlice.actions

const newsDetailReducer = newsDetailSlice.reducer

export default newsDetailReducer