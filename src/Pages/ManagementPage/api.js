import axios from "axios"
import { apiManagement, host } from "../../App/ultil"

export const searchManagementApi = async (searchData) => {
     return await axios.get(host + apiManagement + `/search?search=${searchData.search}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const getAllRoleApi = async () => {
     return await axios.get(host + apiManagement + `/get-all-role`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const getManagementByIdApi = async (id) => {
     return await axios.get(host + apiManagement + `/get-by-id/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const addManagementApi = (request) => {
     return axios.post(
          host + apiManagement,
          request.management,
          {
               params: new URLSearchParams({ roleIds: request.roleIds }),
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
     );
};

export const editManagementApi = async (request) => {
     return await axios.put(host + apiManagement + `/${request.id}`, request.management,
          {
               params: new URLSearchParams({ roleIds: request.roleIds }),
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}

export const deleteManagementApi = async (request) => {
     return await axios.delete(host + apiManagement + `/${request}`,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}