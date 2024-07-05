import axios from "axios"

export const getWeatherDataApi = async (loaction) => {
    return axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loaction}/2024-07-05/2024-07-10?unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cwindspeed%2Cicon&include=days%2Cfcst&key=R9TBMEM929ZA7DQZ8DNGDG2JZ&contentType=json`)
}
