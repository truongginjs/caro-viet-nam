// src/js/store/index.js

import { createStore, compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import thunk from "redux-thunk";
import { decode } from "jsonwebtoken";
import rootReducer from "../reducers/index";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/Auth.action";


const store = createStore(rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

if(localStorage.jwtToken){
    setAuthToken(localStorage.getItem('jwtToken'))
    store.dispatch(setCurrentUser(decode(localStorage.getItem('jwtToken'))))
}

export default store;