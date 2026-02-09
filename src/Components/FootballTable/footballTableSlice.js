import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLeauge, getTableData } from "./api";

export const fetchAllLeauge = createAsyncThunk(
    "footballTable/allLeauge",
    async () => {
        return await getAllLeauge();
    }
);

export const fetchTableData = createAsyncThunk(
    "footballTable/tableData",
    async (data) => {
        return await getTableData(data);
    }
);

const initialState = {
    leauge: "",
    season: "",
    tableData: [],
    leaugeData: [],
    loading: false
};

export const footballTableSlice = createSlice({
    name: "footballTable",
    initialState,
    reducers: {
        changeLeauge: (state, action) => {
            state.leauge = action.payload;
        },
        changeSeason: (state, action) => {
            state.season = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLeauge.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllLeauge.fulfilled, (state, action) => {
                state.leaugeData = action.payload.leagues;
                state.loading = false
            })
            .addCase(fetchAllLeauge.rejected, (state) => {
                state.loading = false
            })
            .addCase(fetchTableData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTableData.fulfilled, (state, action) => {
                state.tableData = action.payload.table;
                state.loading = false
            })
            .addCase(fetchTableData.rejected, (state) => {
                state.loading = false
            })
    },
});

export const {
    changeLeauge,
    changeSeason
} = footballTableSlice.actions;

const footballTableReducer = footballTableSlice.reducer

export default footballTableReducer;