import axios from "axios"
import { apiBank, host } from "../../ultil"

export const searchBankListApi = async (params) => {
    return axios.get(host + apiBank + `/get-banks?pageNumber=${params.pageNumber}&bankName=${params.bankName}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const getBankByIdApi = async (params) => {
    return axios.get(host + apiBank + `/get-bank-by-id/${params}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
}

export const addBankApi = async (params) => {
    const formData = new FormData();
    formData.append("bankName", params.bankName);
    formData.append("bankImage", params.bankImage);

    return axios.post(host + apiBank + `/add-bank`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


export const editBankApi = async (params) => {
    const formData = new FormData();
    formData.append("bankName", params.bankName);
    formData.append("bankImage", params.bankImage);
    formData.append("bankId", params.bankId);

    return axios.put(host + apiBank + `/edit-bank`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

export const deleteBankApi = async (bankId) => {
  return axios.delete(`${host + apiBank}/delete-bank?bankId=${bankId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
