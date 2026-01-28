import axios from "axios"
import { apiCategory, apiManagement, host } from "../../App/ultil"

export const managementDataApi = async (username) => {
    return await axios.get(host + apiManagement + `?username=${username}`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const categoryDataApi = async () => {
    return await axios.get(host + apiCategory + `/permit/get-all` )
}