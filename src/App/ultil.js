import axios from "axios";

// Fly hosting-----------------------------------------------
// export const host = 'https://trang-tin-tuc-v5-be-sdntxw.fly.dev'
// local hosting______________________________________________
export const host = 'http://localhost:8080'

export const apiUser = '/api/user'
export const apiManagement = '/api/managements'
export const apiCategories = '/api/categories'

export const checkUserSessionApi = async (token) => {
    return await axios.get(host + apiUser + `/permit/get-claims-from-token?token=${token}`)
}