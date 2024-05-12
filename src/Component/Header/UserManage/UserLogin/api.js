import axios from "axios"
import { apiUser, host } from "../../../../ultil"


export const userLogin = async (userData) => {
    try {
        return await axios.post(host + apiUser + '/permit/login', userData)
    } catch (e) { return e.response }
}