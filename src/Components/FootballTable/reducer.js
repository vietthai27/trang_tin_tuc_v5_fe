import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leauge: "",
    season: "",
    tableData: [],
    leaugeData: [],
    loading: false
};

const footballTableSlice = createSlice({
    name: "footballTable",
    initialState,
    reducers: {
        changeLeauge: (state, action) => {
            state.leauge = action.payload;
        },
        changeSeason: (state, action) => {
            state.season = action.payload;
        },
        getAllLeaugeRequest: () => { },
        getAllLeaugeSuccess: (state, action) => {
            state.leaugeData = action.payload;
        },
        getAllLeaugeFail: () => { },
        getTableDataRequest: () => { },
        getTableDataSuccess: (state, action) => {
            state.tableData = action.payload;
        },
        getTableDataFail: () => { }
    }
});

const footballTableReducer = footballTableSlice.reducer;

export const {
    changeLeauge,
    changeSeason,
    getAllLeaugeRequest,
    getAllLeaugeSuccess,
    getAllLeaugeFail,
    getTableDataRequest,
    getTableDataSuccess,
    getTableDataFail
} = footballTableSlice.actions;

export default footballTableReducer;
