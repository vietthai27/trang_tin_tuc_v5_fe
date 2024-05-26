import axios from "axios"
import { apiMenu, host } from "../../ultil"

export const menuDataFetch = async () => {
    return await axios.get(host + apiMenu + '/get/getAllDanhMucBaiBao')
}