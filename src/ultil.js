import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

// Render hosting-----------------------------------------------
//export const host = 'https://trangtintuc-v4-be.onrender.com'
// Local hosting------------------------------------------------
export const host = 'http://localhost:8080'

export const apiMenu = '/danhmuc'
export const apiUser = '/user'
export const apiCheckToken = '/permit/tokenIsExpired'

export const checkTokenApi = async (token) => {
    return await axios.post(host + apiUser + `/permit/tokenIsExpired?token=${token}`)
}

export const checkTokenAction = createAction('app/checkToken')
