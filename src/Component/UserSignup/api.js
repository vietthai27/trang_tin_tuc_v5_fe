import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userSignupValidateApi = async (userData) => {
    return await axios.post(host + apiUser + `/permit/user-signup`,userData)
}

export const userSignupRequestApi = async (userData) => {
    return await axios.post(host + apiUser + "/permit/user-signup-request", userData)
}