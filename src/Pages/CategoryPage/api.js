import axios from "axios"
import { apiCategory, host } from "../../App/ultil"

export const searchCategoryApi = async (searchData) => {
     return await axios.get(host + apiCategory + `/search?search=${searchData.search}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const getCategoryByIdApi = async (id) => {
     return await axios.get(host + apiCategory + `/get-by-id/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const addCategoryApi = (request) => {
     return axios.post(
          host + apiCategory,
          request.category,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
     );
};

export const editCategoryApi = async (request) => {
     return await axios.put(host + apiCategory + `/${request.id}`, request.category,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}

export const deleteCategoryApi = async (request) => {
     return await axios.delete(host + apiCategory + `/${request}`,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}