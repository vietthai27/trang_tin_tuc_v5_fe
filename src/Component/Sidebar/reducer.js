import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    tab : '0',
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            console.log(action.payload);
            
            if(action.payload !== undefined)
            state.tab = action.payload
        }
    }
})

const sideBarReducer = sideBarSlice.reducer

export const {
    changeTab,
} = sideBarSlice.actions

export default sideBarReducer