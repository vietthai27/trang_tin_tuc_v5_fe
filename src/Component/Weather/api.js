import axios from "axios"

export const getWeatherDataApi = async (payload) => {
    console.log(payload + 'test api');
    
    return axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${payload.location}/${payload.weatherDates[0]}/${payload.weatherDates[1]}?unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cwindspeed%2Cicon&include=days%2Cfcst&key=R9TBMEM929ZA7DQZ8DNGDG2JZ&contentType=json`)
}
