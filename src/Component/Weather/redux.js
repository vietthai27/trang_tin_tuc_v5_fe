import { createSlice } from "@reduxjs/toolkit"
import { defaultLocation } from "../../ultil"

const initialState = {
    weatherData: {
        days:[]
    },
    weatherToday: {},
    weatherNextdays: []
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeatherRequest: () => {

        },
        getWeatherRequestSucess: (state, action) => {
            state.weatherData = action.payload.data
            state.weatherToday = action.payload.data.days[0]
            state.weatherNextdays = action.payload.data.days.slice(1)
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