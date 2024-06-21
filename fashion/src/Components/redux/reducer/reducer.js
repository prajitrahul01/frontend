import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST } from "../action/action";
import { FETCH_SHOP } from "../action/fetchShop";

const initialState = {
    shop_data: [],
    isLoading: false,
    error: null
}

export const fetchReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_SHOP:
            return {
                ...state,
                isLoading: false,
                shop_data: action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}