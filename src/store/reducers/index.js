import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { ridersReducer } from "./ridersReducer";

export const reducers = combineReducers({
   userReducer,
   ridersReducer
});

