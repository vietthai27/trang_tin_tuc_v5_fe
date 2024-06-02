import axios from "axios"
import { apiMenu, host } from "../../ultil"

export const menuDataApi = async () => {
    return await axios.get(host + apiMenu + '/get/getAllDanhMucBaiBao')
}