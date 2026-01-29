import axios from "axios"
import { apiNews, host } from "../../App/ultil"

export const getLatestNews = () => {
     return axios.get(
          host + apiNews + "/permit/get-latest-news"
     );
}
