import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { errorReducer } from "./errorReducer";

export const reducers = combineReducers({
   userReducer,
   errorReducer
});

