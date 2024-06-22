import axios from "axios"
import { apiSubMenu, host } from "../../ultil"

export const searchSubMenuListApi = async (params) => {
    return axios.get(host + apiSubMenu + `/auth/searchDanhMucConByIdCha?search=${params.search}&pageNum=${params.pageNum - 1}&pageSize=${params.pageSize}&idCha=${params.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const addSubMenuListApi = async (params) => {
    return axios.post(host + apiSubMenu + `/auth/modify/addDanhMucCon/${params.idCha}`, { tenDanhMucCon: params.listSubMenuItem },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const editSubMenuListApi = async (params) => {
    return axios.put(host + apiSubMenu + `/auth/modify/edit/editDanhMucCon/${params.itemId}/${params.idCha}`, { tenDanhMucCon: params.listSubMenuItem },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const deleteSubMenuListApi = async (params) => {
    return axios.delete(host + apiSubMenu + `/auth/delete/deleteDanhMucCon/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}