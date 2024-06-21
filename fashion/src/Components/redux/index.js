import { applyMiddleware, combineReducers, createStore } from "redux"
import { fetchReducer } from "./reducer/reducer"
import {thunk} from "redux-thunk";
import {logger} from "redux-logger";
import registrationReducer from "./reducer/shopReducer";
import { cartReducer } from "./reducer/cartReducer";
import loginReducer from "./reducer/loginReducer";

const rootReducer = combineReducers({
    fetchUser: fetchReducer,
    resigtration: registrationReducer,
    cart: cartReducer,
    login: loginReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))//, applyMiddleware(thunk));
export default store;