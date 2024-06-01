import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    danhMucBaiBao: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        getMenuData: (state) => { },
        getMenuDataSuccess: (state, action) => {
            state.danhMucBaiBao = action.payload.data
        },
        getMenuDataFail: (state) => { }
    }
})

const menuReducer = menuSlice.reducer

export const { getMenuData, getMenuDataSuccess, getMenuDataFail } = menuSlice.actions

export default menuReducer