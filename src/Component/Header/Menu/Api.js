import axios from "axios"
import { apiMenu, hostRender } from "../../../ultil"

export const menuDataFetch = async () => {
    return await axios.get(hostRender + apiMenu + '/get/getAllDanhMucBaiBao')
}