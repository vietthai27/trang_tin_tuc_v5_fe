import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userForgetPassApi = async (userData) => {
    return await axios.post(host + apiUser + `/permit/resetPassword`,userData)
}

export const userResetPassApi = async (userData) => {
    return await axios.post(host + apiUser + `/auth/changePassword`,{ token: localStorage.getItem("token"),...userData},{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
}