import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userLoginApi = async (userData) => {
     return await axios.post(host + apiUser + '/permit/login', userData)
}