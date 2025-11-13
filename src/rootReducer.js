import userLoginReducer from './Component/UserLogin/reducer';
import userManageReducer from './Component/UserManage/reducer';
import { combineSlices, createSlice } from "@reduxjs/toolkit";
import userSignupReducer from './Component/UserSignup/reducer';
import { userForgetPassReducer } from './Component/UserForgetPass/reducer';
import userListReducer from './Pages/UserListPage/redux';
import bankListReducer from './Pages/BankListPage/redux';
import accountListReducer from './Pages/AccountPage/redux';
import billListReducer from './Pages/BillPage/redux';


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
            state.username = action.payload.data.username
            state.userRoles = action.payload.data.roles
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
    userManage: userManageReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userForgetPass: userForgetPassReducer,
    userList: userListReducer,
    bankList: bankListReducer,
    accountList: accountListReducer,
    billList: billListReducer
})