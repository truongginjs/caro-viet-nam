import { combineReducers } from "redux";
import HandleCaro from './HandleCaro.reducer';
import Auth from './Auth.reducer'

const rootReducer = combineReducers({Auth, HandleCaro})

export default rootReducer;
