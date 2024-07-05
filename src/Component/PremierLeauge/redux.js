import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    table: []
}

const premierLeaugeSlice = createSlice({
    name: 'premierLeauge',
    initialState,
    reducers: {
        getPremierLeaugeTableRequest: () => {

        },
        getPremierLeaugeTableSuccess: (state, action) => {
            state.table = action.payload.data.table
        },
        getPremierLeaugeTableFail: () => {

        },
    }
})

const premierLeaugeReducer = premierLeaugeSlice.reducer

export const {
    getPremierLeaugeTableFail,
    getPremierLeaugeTableRequest,
    getPremierLeaugeTableSuccess
} = premierLeaugeSlice.actions

export default premierLeaugeReducer