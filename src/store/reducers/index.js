import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { ridersReducer } from "./ridersReducer";
import { errorReducer } from "./errorReducer";

export const reducers = combineReducers({
   userReducer,
   ridersReducer,
   errorReducer
});

