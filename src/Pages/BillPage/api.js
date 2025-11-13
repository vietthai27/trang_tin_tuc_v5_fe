import axios from "axios"
import { apiBill, host } from "../../ultil"

export const getListUserApi = async () => {
    return axios.get(host + apiBill + `/get-all-user`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const billSplitApi = async (params) => {
    return axios.post(host + apiBill + `/split-bill`, params, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
