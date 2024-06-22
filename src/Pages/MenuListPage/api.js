import axios from "axios"
import { apiMenu, host } from "../../ultil"

export const searchMenuListApi = async (params) => {
    return axios.get(host + apiMenu + `/auth/searchAllDanhMucBaiBao?search=${params.search}&pageNum=${params.pageNum - 1}&pageSize=${params.pageSize}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const addMenuListApi = async (params) => {
    return axios.post(host + apiMenu + `/auth/modify/addDanhMucBaiBao`, { tenDanhMuc: params.listMenuItem },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const editMenuListApi = async (params) => {
    return axios.put(host + apiMenu + `/auth/modify/editDanhMucBaiBao/${params.id}`, { tenDanhMuc: params.listMenuItem },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const deleteMenuListApi = async (params) => {
    return axios.delete(host + apiMenu + `/auth/deleteDanhMucBaiBao/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}