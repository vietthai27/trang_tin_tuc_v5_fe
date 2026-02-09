import axios from "axios"
import { apiNews, apiSubCategory, host } from "../../App/ultil"

export const getNewsBySubCategoty = async (searchData) => {
     return await axios.get(  
          host + apiNews + `/permit/get-news-by-sub-category?title=${searchData.search}&categoryId=${searchData.categoryId}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`
     )
}

export const getSubCategoryByIdApi = async (payload) => {
     return await axios.get(host + apiSubCategory + `/permit/by-category/${payload.id}`)
}

// export const addCategoryApi = (request) => {
//      return axios.post(
//           host + apiCategory,
//           request.category,
//           {
//                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//           }
//      );
// };

// export const editCategoryApi = async (request) => {
//      return await axios.put(host + apiCategory + `/${request.id}`, request.category,
//           {
//                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//           })
// }

// export const deleteCategoryApi = async (request) => {
//      return await axios.delete(host + apiCategory + `/${request}`,
//           {
//                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//           })
// }