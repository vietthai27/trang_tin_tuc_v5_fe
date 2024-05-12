import * as types from "./Constant";

const initalState = {
    danhMucBaiBao: [],
    loading: false,
    error: null
}

const menuReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GET_MENU_DATA:
            return { ...state, loading: true }
        case types.GET_MENU_DATA_SUCCESS: 
            return { ...state, loading: false, danhMucBaiBao: action.payload.data }
        case types.GET_MENU_DATA_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return { ...state }
    }
}

export default menuReducer