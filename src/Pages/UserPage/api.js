import axios from "axios"
import { apiUser, host } from "../../App/ultil"

export const searchUserApi = async (searchData) => {
     return await axios.get(host + apiUser + `/auth/search-users?search=${searchData.search}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const changeModerRoleApi = async (request) => {
     return await axios.post(host + apiUser + `/auth/change-role-moder`, request, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}