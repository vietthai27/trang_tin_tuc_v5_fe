import axios from "axios"
import { apiSubCategory, host } from "../../App/ultil"



export const searchSubCategoryApi = async (searchData) => {
     return await axios.get(host + apiSubCategory + `/search?search=${searchData.search}&categoryId=${searchData.id}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const getSubCategoryByIdApi = async (id) => {
     return await axios.get(host + apiSubCategory + `/get-by-id/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const addSubCategoryApi = (request) => {
     return axios.post(
          host + apiSubCategory + `?categoryId=${request.idCategory.id}`,
          request.subCategory,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
     );
};

export const editSubCategoryApi = async (request) => {
     return await axios.put(host + apiSubCategory + `/${request.id}?categoryId=${request.idCategory.id}`, request.subCategory,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}

export const deleteSubCategoryApi = async (request) => {
     return await axios.delete(host + apiSubCategory + `/${request.id}`,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}