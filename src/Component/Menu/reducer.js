import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    danhMucBaiBao: [],
    loading: false,
    error: null,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        getMenuData: (state) => {
            state.loading = true
        },
        getMenuDataSuccess: (state, action) => {
            state.loading = false
            state.danhMucBaiBao = action.payload.data
        },
        getMenuDataFail: (state) => {
            state.loading = false
        }
    }
})

const menuReducer = menuSlice.reducer

export const { getMenuData, getMenuDataSuccess, getMenuDataFail } = menuSlice.actions

export default menuReducer