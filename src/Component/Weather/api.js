import axios from "axios"

export const getWeatherDataApi = async (loaction) => {
    return axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loaction}?unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cwindspeed%2Cicon&include=fcst%2Cdays&key=R9TBMEM929ZA7DQZ8DNGDG2JZ&contentType=json`)
}
