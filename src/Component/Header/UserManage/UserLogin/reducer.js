import * as types from "./constant";

const initalState = {
    token: "",
    loginError: null
}

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_REQUEST:
            return { loading: true }
        case types.USER_LOGIN_SUCCESS:
            console.log("sdf");
            break
        case types.USER_LOGIN_FAIL:
            console.log(action.payload);
            return null
        default:
            return { ...state }
    }
}

export default userReducer