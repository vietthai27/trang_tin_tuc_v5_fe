import axios from "axios"
import { apiAccount, apiBank, host } from "../../ultil"

export const getAccountByUsernameApi = async (params) => {
    return axios.get(host + apiAccount + `/get-account-by-username?username=${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const getAllBanksApi = async (params) => {
    return axios.get(host + apiBank + `/get-all-bank`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const addAccountApi = async (params) => {
    const formData = new FormData();
    formData.append("username", params.username);
    formData.append("accountNumber", params.accountNumber);
    formData.append("bankId", params.bankId);
    formData.append("qrImage", params.qrImage);

    return axios.post(host + apiAccount + `/add-bank-account`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getAccountById = async (params) => {
    return axios.get(host + apiAccount + `/get-account-by-id?accountId=${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}


export const editAccountApi = async (params) => {
    const formData = new FormData();
    formData.append("username", params.username);
    formData.append("accountId", params.accountId);
    formData.append("bankId", params.bankId);
    formData.append("accountNumber", params.accountNumber);
    formData.append("qrImage", params.qrImage);
    return axios.put(host + apiAccount + `/edit-bank-account`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

export const deleteAccountApi = async (accountId) => {
    return axios.delete(`${host + apiAccount}/delete-account?accountId=${accountId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
};
