// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import applyForInterIITModalReducer from './applyForInterIITModalReducer';
const rootReducer = combineReducers({
    auth:authReducer,
    modal:applyForInterIITModalReducer,
    // IIPuser:setIsIITPatnaUser,
    // isAdmin:setAdminStatus,
});

export default rootReducer;
