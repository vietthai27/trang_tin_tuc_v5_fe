import axios from "axios"
import { apiUser, host } from "../../ultil"

export const getAllUserApi = async (params) => {
    return axios.get(host + apiUser + `/auth/getAllUser?pageSize=${params.pageSize}&pageNum=${params.pageNum}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("User token")}` } }
    )
}

export const setModerRoleApi = async (params) => {
    return axios.put(host + apiUser + `/auth/setModerRole/${params}`,{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("User token")}` } }
    )
}

export const deleteModerRoleApi = async (params) => {
    return axios.delete(host + apiUser + `/auth/deleteUserModer/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("User token")}` } }
    )
}