import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userSignupValidateApi = async (userData) => {
    return await axios.post(host + apiUser + `/permit/userSignup?email=${userData.email}&validateCode=${userData.validateCode}`)
}

export const userSignupRequestApi = async (userData) => {
    return await axios.post(host + apiUser + "/permit/userSignupRequest", userData)
}