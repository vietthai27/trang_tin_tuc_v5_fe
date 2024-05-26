import axios from "axios"
import { apiUser, hostRender } from "../../../../ultil"

export const userLoginFetch = async (userData) => {
     return await axios.post(hostRender + apiUser + '/permit/login', userData)
}