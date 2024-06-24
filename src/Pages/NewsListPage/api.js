import axios from "axios"
import { apiNews, apiSubMenu, apiUser, host } from "../../ultil"

export const deleteNewsApi = async (params) => {
    return axios.delete(host + apiNews + `/delete/deleteBaiBao/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const searchNewsApi = async (params) => {
    return axios.get(host + apiNews + `/get/searchAllBaiBao?tenBaiBao=${params.search}&pageSize=${params.pageSize}&pageNum=${params.pageNum - 1}`
    )
}

export const addNewsApi = async (params) => {
    const idCon = params.idCon
    params = Object.keys(params).filter(objKey =>
        objKey !== 'idCon').reduce((newObj, key) => {
            newObj[key] = params[key];
            return newObj;
        }, {}
        );
    return axios.post(host + apiNews + `/modify/addBaiBao/${idCon}`, {
        tenBaiBao: params.tenBaiBao,
        tieuDe: params.tieuDe,
        thumbnail: params.thumbnail,
        noiDung: params.noiDung,
        luotXem: params.luotXem,
        tacGia: params.tacGia
    },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const editNewsApi = async (params) => {
    const idCon = params.idCon
    const idBaiBao = params.id
    params = Object.keys(params).filter(objKey =>
        objKey !== 'idCon').reduce((newObj, key) => {
            newObj[key] = params[key];
            return newObj;
        }, {}
        );
    return axios.post(host + apiNews + `/modify/editBaiBao/${idBaiBao}/${idCon}`, {
        tenBaiBao: params.tenBaiBao,
        tieuDe: params.tieuDe,
        thumbnail: params.thumbnail,
        noiDung: params.noiDung,
        tacGia: params.tacGia
    },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
}

export const getSubMenuApi = async (param) => {
    return axios.get(host + apiSubMenu + `/get/getAllDanhMucConByIdCha/${param}`
    )
}