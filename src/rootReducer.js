import { toast } from 'react-toastify';
import menuReducer from './Component/Menu/reducer';
import userLoginReducer from './Component/UserLogin/reducer';
import userManageReducer from './Component/UserManage/reducer';
import { combineSlices, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginState: false,
    loading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        checkTokenRequest: (state, action) => {
            state.loading = true
        },
        checkTokenSuccess: (state, action) => {
            state.loading = false
            state.loginState = true
        },
        checkTokenFail: (state, action) => {
            if (action.payload.response.status === 403) {
                toast.warning(action.payload.response.data.message)
            }
            localStorage.removeItem("Username")
            localStorage.removeItem("User token")
            state.loading = false
        },
        setLoginState: (state, action) => {
            state.loginState = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

const appReducer = appSlice.reducer

export const { checkTokenRequest,
    checkTokenSuccess,
    checkTokenFail,
    setLoginState,
    setLoading } = appSlice.actions

export const rootReducer = combineSlices({
    app: appReducer,
    userManage: userManageReducer,
    menu: menuReducer,
    userLogin: userLoginReducer
})