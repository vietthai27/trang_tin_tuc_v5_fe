import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inputCity: "",
    relsovedCity: "",
    weatherData: [],
    loading: false
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        changeInputCity: (state, action) => {
            state.inputCity = action.payload;
        },
        changeWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
        changeRelsoveCity: (state, action) => {
            state.relsovedCity = action.payload;
        },
        getWeatherDataRequest: () => { },
        getWeatherDataSuccess: (state, action) => {
            state.weatherData = action.payload.days;
            state.relsovedCity = action.payload.resolvedAddress;
        },
        getWeatherDataFail: () => { }
    }
});

const weatherReducer = weatherSlice.reducer;

export const {
    changeInputCity,
    changeWeatherData,
    changeRelsoveCity,
    getWeatherDataRequest,
    getWeatherDataSuccess,
    getWeatherDataFail
} = weatherSlice.actions;

export default weatherReducer;
