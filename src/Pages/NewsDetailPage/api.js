import axios from "axios"
import { apiNews, host } from "../../ultil"

export const getNewsDetailApi = async (params) => {
    return axios.get(host + apiNews + `/get/getBaiBaoDetailById/${params}`
    )
}
