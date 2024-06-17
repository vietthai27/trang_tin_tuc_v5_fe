import axios from "axios";

// Render hosting-----------------------------------------------
//export const host = 'https://trang-tin-tuc-v5-be.onrender.com'
// Local hosting------------------------------------------------
export const host = 'http://localhost:8080'
// network hosting______________________________________________
//export const host = 'http://192.168.0.86:8080'

// BE host: https://dashboard.render.com/web/srv-cpe38bvsc6pc7398s540/deploys/dep-cpe4h4n109ks73epgsl0?r=2024-06-02%4010%3A24%3A24%7E2024-06-02%4010%3A32%3A30
// DB host: https://console.aiven.io/account/a4b1c34f2366/project/thai27webdeveloper-7dc4/services/pg-20cb3ce/overview

export const apiMenu = '/danhmuc'
export const apiUser = '/user'
export const apiCheckToken = '/permit/tokenIsExpired'

export const checkUserSessionApi = async (token) => {
    return await axios.get(host + apiUser + `/permit/getClaimsFromToken?token=${token}`)
}
