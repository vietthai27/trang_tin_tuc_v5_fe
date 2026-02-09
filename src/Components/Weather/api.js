import axios from "axios";

export const getWeatherData = (inputCity) => {
    return axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}/next7days?unitGroup=metric&elements=aqius%2Cvisibility%2Cdatetime%2Cdescription%2Cdew%2Chumidity%2Cicon%2Cname%2Coffset%2Csource%2CsunriseEpoch%2CsunsetEpoch%2Ctemp%2Ctempmax%2Ctempmin%2Cuvindex%2Cwindspeed&include=days&key=R9TBMEM929ZA7DQZ8DNGDG2JZ&contentType=json`
    );
};