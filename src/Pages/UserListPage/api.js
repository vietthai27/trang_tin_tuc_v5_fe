import axios from "axios"
import { apiUser, host } from "../../ultil"

export const deleteUserApi = async (params) => {
    return axios.delete(host + apiUser + `/auth/admin/delete-user-by-id/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const searchUserApi = async (params) => {
    return axios.get(host + apiUser + `/auth/admin/search-user?search=${params.search}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const setModerRoleApi = async (params) => {
    return axios.put(host + apiUser + `/auth/admin/set-moder-role/${params}`,{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const deleteModerRoleApi = async (params) => {
    return axios.put(host + apiUser + `/auth/admin/unset-moder-role/${params}`,{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}