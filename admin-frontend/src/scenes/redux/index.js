import { applyMiddleware, combineReducers, createStore } from "redux"
import {thunk} from "redux-thunk";
import {logger} from "redux-logger";
import loginReducer from "./reducer/loginReducer";

const rootReducer = combineReducers({
    login: loginReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))//, applyMiddleware(thunk));
export default store;