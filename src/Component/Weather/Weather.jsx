import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWeatherRequest } from "./redux"

const Weather = () => {

    const dispatch = useDispatch()

    const { weatherData } = useSelector(state => state.weather)

    const [location, setLocation] = useState("phu do ha noi")

    useEffect(() => {
        dispatch(getWeatherRequest(location))
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Weather