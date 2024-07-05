import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWeatherRequest } from "./redux"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { TextField } from "@mui/material";

const Weather = () => {

    const dispatch = useDispatch()

    const { weatherData, weatherToday, weatherNextdays } = useSelector(state => state.weather)

    const [location, setLocation] = useState("phu do ha noi")

    console.log(weatherToday.icon);

    useEffect(() => {
        dispatch(getWeatherRequest(location))
    }, [location])
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            setLocation(e.target.value)
            e.preventDefault();
        }
    }

    return (
        <div>
            <h1 className="component-title">Dự báo thời tiết</h1>
            <TextField
                id="outlined-basic"
                margin="dense"
                fullWidth
                label="Location"
                variant="outlined"
                onKeyPress={onKeyPress}
            />
            <div style={{ backgroundImage: `url(/weather/background/${weatherToday.icon}-background.jpg)` }} className="weather-container">
                <h3> <LocationOnIcon /> {weatherData.resolvedAddress}</h3>
                <div className="weather-info">
                    <div className="weather-today">
                        <div className="weather-today-left">
                            <h5>{weatherToday.datetime}</h5>
                            <img src={`/weather/icon/${weatherToday.icon}.png`} alt="weather-icon" />
                        </div>
                        <div className="weather-today-left">
                            <h2><ThermostatIcon /> {weatherToday.temp}&#8451;</h2>
                            <p><ArrowCircleUpIcon /> {weatherToday.tempmax}&#8451; / <ArrowCircleDownIcon /> {weatherToday.tempmin}&#8451;</p>
                            <p><AirIcon /> {weatherToday.windspeed} km/h || <WaterDropIcon /> {weatherToday.humidity} %</p>
                        </div>

                    </div>
                    <div className="weather-nextdays">
                        {weatherNextdays.map((item) => (
                            <div className="weather-nextdays-detail">
                                <img src={`/weather/icon/${weatherToday.icon}.png`} alt="weather-icon" />
                                <p>{item.temp}&#8451;</p>
                                <p>{item.datetime.substring(5)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather