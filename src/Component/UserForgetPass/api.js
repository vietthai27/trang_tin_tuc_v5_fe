import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userForgetPassApi = async (userData) => {
    return await axios.post(host + apiUser + `/permit/reset-password`,userData)
}

export const userResetPassApi = async (userData) => {
    return await axios.post(host + apiUser + `/auth/change-password`,{ token: localStorage.getItem("token"),...userData},{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
}