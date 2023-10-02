import {SIGN_OUT,UPDATE_USER} from '../action/types'
// Initial state
const initialState = {
    currentUser: null,
  };

  // Action creators
  export const updateUser = (user) => {
    return {
      type: UPDATE_USER,
      payload: user,
    };
  };
  
  // Reducer
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
          ...state,
          currentUser: action.payload,
        };
        case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
      default:
        return state;
    }
  };
  
  export default userReducer;
  