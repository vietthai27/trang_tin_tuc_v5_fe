
import menuReducer from '../Components/Header/reducer';
import userLoginReducer from '../Components/UserLogin/reducer';
import { combineSlices, createSlice } from "@reduxjs/toolkit";
import userSignupReducer from '../Components/UserSignup/reducer';
import { userForgetPassReducer } from '../Components/UserForgetPass/reducer';
import headerReducer from '../Components/Header/reducer';
import userPageReducer from '../Pages/UserPage/reducer';
import managementPageReducer from '../Pages/ManagementPage/reducer';

const initialState = {
    loginState: false,
    loading: false,
    username: '',
    userRoles: [],
    loadingCount: 0
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setLoginState: (state, action) => {
            state.loginState = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        checkUserSessionRequest:( state, action) => {
        },
        checkUserSessionSuccess:( state, action) => {
            state.loginState = true
            state.username = action.payload.username
            state.userRoles = action.payload.roles
        },
        checkUserSessionFail:( state, action) => {
        },
        startLoading: (state) => {
            state.loadingCount = state.loadingCount + 1
        },
        endLoading: (state) => {
            state.loadingCount = state.loadingCount - 1
        }
        
    }
})

const appReducer = appSlice.reducer

export const {
    setUsername,
    setLoginState,
    setLoading,
    checkUserSessionFail,
    checkUserSessionRequest,
    checkUserSessionSuccess,
    endLoading,
    startLoading,

} = appSlice.actions

export const rootReducer = combineSlices({
    app: appReducer,
    menu: menuReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userForgetPass: userForgetPassReducer,
    header: headerReducer,
    userPage: userPageReducer,
    managementPage: managementPageReducer
})