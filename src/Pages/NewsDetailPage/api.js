import axios from "axios"
import { apiNews, host } from "../../App/ultil";

export const getNewsDetail = (id) => {
     return axios.get(
          host + apiNews + "/permit/get-news-detail/" + id
     );
}
