import axios from "axios"
import { apiNews, host } from "../../App/ultil"

export const uploadImageKitApi = (file) => {
     const formData = new FormData();
     formData.append("file", file);
     return axios.post(
          host + apiNews + "/imagekit/upload",
          formData,
          {
               headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}` },
          }
     );
}

export const deleteImageKitApi = (url) => {
     return axios.delete(
          host + apiNews + "/imagekit?url=" + url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     }
     );
}
