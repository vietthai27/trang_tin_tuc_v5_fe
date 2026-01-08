import axios from "axios"
import { apiUser, host } from "../../App/ultil"

export const userSignupValidateApi = async (userData) => {
    return await axios.post(host + apiUser + `/permit/signup`,userData)
}

export const userSignupRequestApi = async (userData) => {
    return await axios.post(host + apiUser + "/permit/signup-request", userData)
}