import productsReducer from "./productsReducer";
import loginReducer from "./loginReducer"
import cartReducer from "./cartReducer"

import { combineReducers, createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { defaultState } from "../store";

const rootReducer = combineReducers({
    auth: loginReducer,
    products: productsReducer,
    cart: cartReducer
})


export const store = createStore(rootReducer, defaultState, composeWithDevTools(applyMiddleware(thunk)))


