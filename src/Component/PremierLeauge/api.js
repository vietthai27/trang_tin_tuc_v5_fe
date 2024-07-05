import axios from "axios"

export const getPremierLeaugeTableApi = (season) => {
    return axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${season}`)
}