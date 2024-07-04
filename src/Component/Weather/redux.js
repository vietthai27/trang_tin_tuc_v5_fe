import { createSlice } from "@reduxjs/toolkit"
import { defaultLocation } from "../../ultil"

const initialState = {
    weatherData: {},
    location: 'phu do'
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeatherRequest: () => {

        },
        getWeatherRequestSucess: (state, action) => {
            state.weatherData = action.payload.data
        },
        getWeatherRequestFail: () => {

        }
    }
})

const weatherReducer = weatherSlice.reducer

export const {
    getWeatherRequest,
    getWeatherRequestFail,
    getWeatherRequestSucess
} = weatherSlice.actions

export default weatherReducer