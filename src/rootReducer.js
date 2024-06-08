import { toast } from 'react-toastify';
import menuReducer from './Component/Menu/reducer';
import userLoginReducer from './Component/UserLogin/reducer';
import userManageReducer from './Component/UserManage/reducer';
import { combineSlices, createSlice } from "@reduxjs/toolkit";
import userSignupReducer from './Component/UserSignup/reducer';
import { userForgetPassReducer } from './Component/UserForgetPass/reducer';
import userListReducer from './Pages/UserListPage/redux';

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
            state.loading = false


            localStorage.removeItem("Username")
            localStorage.removeItem("User token")
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
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userForgetPass: userForgetPassReducer,
    userList: userListReducer
})