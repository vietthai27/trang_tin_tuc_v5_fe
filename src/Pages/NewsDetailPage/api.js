import axios from "axios"
import { apiComment, apiLike, apiNews, host } from "../../App/ultil";

export const getNewsDetail = (data) => {
     return axios.get(
          host + apiNews + "/permit/get-news-detail/" + data.id
     );
}

const authHeader = () => {
     const token = localStorage.getItem("token");
     return {
          headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
          },
     };
};

export const likeNews = (data) => {
     return axios.post(
          host + apiLike + `/${data.id}/like?username=${data.username}`,
          {},
          authHeader()
     );
};

export const unlikeNews = (data) => {
     return axios.delete(
          host + apiLike + `/${data.id}/unlike?username=${data.username}`,
          authHeader()
     );
};

export const getLikeCount = (data) => {
     return axios.get(
          host + apiLike + `/permit/${data.id}/count`
     );
};

export const getLikeByUser = (data) => {
     return axios.get(
          host + apiLike + `/${data.id}/is-like-by-user?username=${data.username}`,
          authHeader()
     );
};

export const addComment = (newsId, username, content) => {
     return axios.post(
          host + apiComment + `?newsId=${newsId}&username=${username}`,
          { content: content },
          authHeader()
     );
};

export const editComment = (commentId, newsId, username, content) => {
     return axios.put(
          host + apiComment + `?commentId=${commentId}&newsId=${newsId}&username=${username}`,
          { content: content },
          authHeader()
     );
};

export const getCommentsByNews = (data) => {
     return axios.get(
          host + apiComment + `/permit/news/${data.id}`
     );
};

export const deleteComment = (commentId) => {
     return axios.delete(
          host + apiComment + `/${commentId}`,
          authHeader()
     );
};
