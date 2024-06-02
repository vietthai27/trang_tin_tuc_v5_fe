import axios from "axios"
import { apiUser, host } from "../../ultil"

export const userForgetPassApi = async (userData) => {
    return await axios.get(host + apiUser + `/permit/resetPassword?email=${userData.email}&username=${userData.username}`)
}

export const userResetPassApi = async (userData) => {
    return await axios.get(host + apiUser + `/auth/changePassword?token=${localStorage.getItem("User token")}&newPassword=${userData.newPassword}&oldPassword=${userData.oldPassword}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem("User token")}` }
    })
}