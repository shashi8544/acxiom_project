import { SET_USER,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_ERROR,FETCH_ADMIN_STATUS_SUCCESS, SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from '../action/types';

const initialState = {
  userData: null,
  isAdmin: false,
  isIITPatnaUser: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_USER:
          return { ...state, userData: action.payload };
      case 'SET_ADMIN_STATUS':
          return { ...state, isAdmin: action.payload };
      case 'SET_IS_IITPATNA_USER':
          return { ...state, isIITPatnaUser: action.payload };
      default:
          return state;
  }
};

export default authReducer;
