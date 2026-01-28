import axios from "axios"
import { apiNews, host } from "../../App/ultil"

export const addNewsApi = (request) => {
     return axios.post(host + apiNews, request,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
     );
};

export const editNewsApi = (request) => {
     return axios.put(host + apiNews + `/${request.id}`, request,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
     );
};

export const searchNewsApi = async (searchData) => {
     return await axios.get(host + apiNews + `/search?title=${searchData.title}&description=${searchData.description}&pageNum=${searchData.pageNum}&pageSize=${searchData.pageSize}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     })
}

export const deleteNewsApi = async (id) => {
     return await axios.delete(host + apiNews + `/${id}`,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}

export const getNewsByIdApi = async (id) => {
     return await axios.get(host + apiNews + `/get-by-id/${id}`,
          {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
}