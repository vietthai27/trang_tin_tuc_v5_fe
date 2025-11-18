// File: api.js

import axios from "axios"
import { apiAccount, apiBill, host } from "../../ultil"

export const getListUserApi = async () => {
    return axios.get(host + apiBill + `/get-all-user`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const billSplitApi = async (params) => {
    return axios.post(host + apiBill + `/split-bill`, {users: params}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

// 💡 NEW API FUNCTION to fetch accounts by user
export const getAccountListApi = async (toUser) => {
    // Assuming the API endpoint accepts the receiver's username (toUser)
    return axios.get(host + apiAccount + `/get-account-by-username?username=${toUser}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};