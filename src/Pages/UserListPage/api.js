import axios from "axios"
import { apiUser, host } from "../../ultil"

export const deleteUserApi = async (params) => {
    return axios.delete(host + apiUser + `/auth/deleteUserById/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const searchUserApi = async (params) => {
    return axios.get(host + apiUser + `/auth/searchUser?search=${params.search}&pageSize=${params.pageSize}&pageNum=${params.pageNum - 1}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const setModerRoleApi = async (params) => {
    return axios.put(host + apiUser + `/auth/setUserModerRole/${params}`,{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const deleteModerRoleApi = async (params) => {
    return axios.put(host + apiUser + `/auth/unsetUserModerRole/${params}`,{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}