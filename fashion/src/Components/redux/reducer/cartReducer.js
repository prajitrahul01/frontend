import { PRODUCT_INCREASE, PRODUCT_DECREASE, PRODUCT_REMOVE } from "../action/actionCart";
import { ADD_TO_CART } from "../action/addToCart";

const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type){
        case PRODUCT_INCREASE:
            return {
                ...state,
                cart: state.cart.map(item => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            };
            case PRODUCT_DECREASE:
                return {
                    ...state,
                    cart: state.cart.map(item => {
                        if (item.id === action.payload.id && item.quantity > 0) {
                            const updatedQuantity = item.quantity - 1;
                            if (updatedQuantity === 0) {
                                return null;
                            } else {
                                return {
                                    ...item,
                                    quantity: updatedQuantity
                                };
                            }
                        }
                        return item; 
                    }).filter(Boolean) 
                };
        case PRODUCT_REMOVE:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id) 
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, {...action.payload, quantity: 1}]
            };
        default:
            return state;
    }
};
