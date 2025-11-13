import axios from "axios"
import { apiUser, host } from "./ultil"

export const checkUserSessionApi = async (token) => {
    return await axios.get(host + apiUser + `/permit/get-claims-from-token?token=${token}`)
}